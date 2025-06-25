#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Текущая дата для тегов
DATE=$(date +%Y%m%d_%H%M%S)

# Имя проекта
PROJECT_NAME="arken"

# Определяем текущий активный контейнер (blue или green)
get_active_container() {
  ACTIVE=$(docker ps --filter "name=${PROJECT_NAME}" --format "{{.Names}}" | grep -E "${PROJECT_NAME}_(blue|green)")
  if [[ $ACTIVE == *"blue"* ]]; then
    echo "blue"
  elif [[ $ACTIVE == *"green"* ]]; then
    echo "green"
  else
    echo "none"
  fi
}

# Определяем следующий контейнер для деплоя
get_next_container() {
  ACTIVE=$(get_active_container)
  if [[ $ACTIVE == "blue" ]]; then
    echo "green"
  else
    echo "blue"
  fi
}

# Сохраняем текущее состояние для возможного отката
backup_current_state() {
  ACTIVE=$(get_active_container)
  if [[ $ACTIVE != "none" ]]; then
    echo -e "${YELLOW}Сохраняем текущее состояние ($ACTIVE)...${NC}"
    docker tag ${PROJECT_NAME}_${ACTIVE}:latest ${PROJECT_NAME}_${ACTIVE}:backup_${DATE}
    echo -e "${GREEN}Резервная копия создана: ${PROJECT_NAME}_${ACTIVE}:backup_${DATE}${NC}"
  fi
}

# Собираем новый образ
build_new_image() {
  NEXT=$(get_next_container)
  echo -e "${YELLOW}Собираем новый образ (${NEXT})...${NC}"
  
  # Собираем бэкенд
  docker build -t ${PROJECT_NAME}_backend_${NEXT}:latest ./backend
  
  # Собираем фронтенд
  docker build -t ${PROJECT_NAME}_frontend_${NEXT}:latest ./frontend
  
  # Проверяем успешность сборки
  if [ $? -ne 0 ]; then
    echo -e "${RED}Ошибка при сборке образов!${NC}"
    return 1
  fi
  
  echo -e "${GREEN}Новые образы успешно собраны${NC}"
  return 0
}

# Запускаем новые контейнеры
start_new_containers() {
  NEXT=$(get_next_container)
  echo -e "${YELLOW}Запускаем новые контейнеры (${NEXT})...${NC}"
  
  # Создаем docker-compose-${NEXT}.yml на основе docker-compose.yml
  # с измененными именами сервисов и портами
  cp docker-compose.yml docker-compose-${NEXT}.yml
  
  # Заменяем имена сервисов и порты
  sed -i "s/backend:/backend_${NEXT}:/g" docker-compose-${NEXT}.yml
  sed -i "s/frontend:/frontend_${NEXT}:/g" docker-compose-${NEXT}.yml
  
  # Запускаем новые контейнеры
  docker-compose -f docker-compose-${NEXT}.yml up -d
  
  # Проверяем, что контейнеры запустились
  if [ $? -ne 0 ]; then
    echo -e "${RED}Ошибка при запуске новых контейнеров!${NC}"
    return 1
  fi
  
  echo -e "${GREEN}Новые контейнеры запущены${NC}"
  return 0
}

# Проверяем работоспособность новых контейнеров
check_health() {
  NEXT=$(get_next_container)
  echo -e "${YELLOW}Проверяем работоспособность новых контейнеров (${NEXT})...${NC}"
  
  # Ждем, пока сервисы запустятся
  sleep 10
  
  # Проверяем бэкенд
  BACKEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health || echo "failed")
  
  # Проверяем фронтенд
  FRONTEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "failed")
  
  if [[ "$BACKEND_HEALTH" == "200" && "$FRONTEND_HEALTH" == "200" ]]; then
    echo -e "${GREEN}Проверка здоровья пройдена успешно${NC}"
    return 0
  else
    echo -e "${RED}Проверка здоровья не пройдена! Backend: $BACKEND_HEALTH, Frontend: $FRONTEND_HEALTH${NC}"
    return 1
  fi
}

# Переключаем трафик на новые контейнеры
switch_traffic() {
  NEXT=$(get_next_container)
  echo -e "${YELLOW}Переключаем трафик на новые контейнеры (${NEXT})...${NC}"
  
  # Обновляем настройки Nginx или другого прокси
  # Пример для Nginx:
  # cp nginx-${NEXT}.conf /etc/nginx/conf.d/default.conf
  # nginx -s reload
  
  echo -e "${GREEN}Трафик успешно переключен на новые контейнеры${NC}"
  return 0
}

# Останавливаем старые контейнеры
stop_old_containers() {
  ACTIVE=$(get_active_container)
  if [[ $ACTIVE != "none" ]]; then
    echo -e "${YELLOW}Останавливаем старые контейнеры (${ACTIVE})...${NC}"
    docker-compose -f docker-compose-${ACTIVE}.yml down
    echo -e "${GREEN}Старые контейнеры остановлены${NC}"
  fi
}

# Откат к предыдущей версии
rollback() {
  ACTIVE=$(get_active_container)
  NEXT=$(get_next_container)
  
  echo -e "${RED}Выполняем откат к предыдущей версии...${NC}"
  
  # Останавливаем новые контейнеры
  docker-compose -f docker-compose-${NEXT}.yml down
  
  # Если есть активные контейнеры, запускаем их снова
  if [[ $ACTIVE != "none" ]]; then
    docker-compose -f docker-compose-${ACTIVE}.yml up -d
    echo -e "${GREEN}Откат к предыдущей версии выполнен успешно${NC}"
  else
    echo -e "${YELLOW}Нет предыдущей версии для отката${NC}"
  fi
}

# Запускаем миграции и заполнение базы данных
run_migrations() {
  NEXT=$(get_next_container)
  echo -e "${YELLOW}Запускаем миграции и заполнение базы данных...${NC}"
  
  # Запускаем скрипт deploy.ts внутри контейнера
  docker exec -it ${PROJECT_NAME}_backend_${NEXT} /app/docker-deploy.sh
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Ошибка при выполнении миграций!${NC}"
    return 1
  fi
  
  echo -e "${GREEN}Миграции успешно выполнены${NC}"
  return 0
}

# Основная функция деплоя
deploy() {
  echo -e "${GREEN}=== Начинаем процесс деплоя ===${NC}"
  
  # Шаг 1: Сохраняем текущее состояние
  backup_current_state
  
  # Шаг 2: Собираем новые образы
  build_new_image
  if [ $? -ne 0 ]; then
    echo -e "${RED}Деплой прерван из-за ошибки сборки${NC}"
    exit 1
  fi
  
  # Шаг 3: Запускаем новые контейнеры
  start_new_containers
  if [ $? -ne 0 ]; then
    echo -e "${RED}Деплой прерван из-за ошибки запуска контейнеров${NC}"
    exit 1
  fi
  
  # Шаг 4: Запускаем миграции
  run_migrations
  if [ $? -ne 0 ]; then
    echo -e "${RED}Деплой прерван из-за ошибки миграций${NC}"
    rollback
    exit 1
  fi
  
  # Шаг 5: Проверяем работоспособность
  check_health
  if [ $? -ne 0 ]; then
    echo -e "${RED}Деплой прерван из-за проблем с работоспособностью${NC}"
    rollback
    exit 1
  fi
  
  # Шаг 6: Переключаем трафик
  switch_traffic
  if [ $? -ne 0 ]; then
    echo -e "${RED}Деплой прерван из-за ошибки переключения трафика${NC}"
    rollback
    exit 1
  fi
  
  # Шаг 7: Останавливаем старые контейнеры
  stop_old_containers
  
  echo -e "${GREEN}=== Деплой успешно завершен ===${NC}"
}

# Запускаем деплой
deploy
