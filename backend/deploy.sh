#!/bin/bash

# Deployment script for academy.api project
# This script unzips the project archive and deploys it using Docker


if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Installing Docker..."
  
  # Update package lists
  sudo apt-get update
  
  # Install prerequisites
  sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

  # Add Docker's official GPG key
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  
  # Add Docker repository
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  
  # Update package lists again
  sudo apt-get update
  
  # Install Docker CE
  sudo apt-get install -y docker-ce
  
  # Add current user to docker group to avoid using sudo
  sudo usermod -aG docker $USER
  
  echo "Docker installed successfully"
else
  echo "Docker is already installed"
fi

# Check and install Docker Compose if needed
if ! command -v docker compose &> /dev/null; then
  echo "Docker Compose is not installed. Installing Docker Compose..."
  
  # Install Docker Compose
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
  
  echo "Docker Compose installed successfully"
else
  echo "Docker Compose is already installed"
fi

# Deploy with Docker Compose
echo "Deploying with Docker Compose..."
docker compose down

# Run the application with migrations and seeding
docker compose up -d

# Wait for containers to start
echo "Waiting for containers to start..."
sleep 10

# Run Prisma commands
echo "Running Prisma commands..."

# Print current DATABASE_URL from container
docker exec academy_api bash -c 'echo "Container DATABASE_URL is: $DATABASE_URL"'

# Ensure Prisma commands use the correct DATABASE_URL from the environment
docker exec academy_api bash -c 'bun prisma generate'
docker exec academy_api bash -c 'bun prisma migrate deploy'

# Run seed script with environment variables
echo "Running seed script..."
docker exec academy_api bash -c '/app/seed.sh'

echo "Deployment completed successfully!"
echo "API should be running at http://localhost:8000"



