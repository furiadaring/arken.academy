#!/bin/sh

# Переходим в директорию приложения
cd /app

# Обновляем код из репозитория (если нужно)
# git pull

# Устанавливаем зависимости
bun install

# Запускаем скрипт развертывания
bun src/scripts/deploy.ts

# Опционально: перезапускаем сервер
# pm2 restart app
