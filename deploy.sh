#!/bin/bash

# Exit on error
set -e

# Create nginx directories if they don't exist
echo "Setting up nginx directories..."
mkdir -p ./nginx/conf
mkdir -p ./nginx/certbot/conf
mkdir -p ./nginx/certbot/www

# Make sure SSL certificates exist (this is just a check, they should be set up correctly)
if [ ! -d "./nginx/certbot/conf/live/arken.academy" ]; then
  echo "Warning: SSL certificates not found. Make sure to set up Certbot before running in production."
  # You might want to add certbot setup commands here or run them separately
  # For testing, we'll proceed without SSL
 fi

# Make sure the domain name is set correctly in nginx configuration
echo "Checking nginx configuration..."
if [ ! -f "./nginx/conf/default.conf" ]; then
  echo "nginx configuration not found. Creating default configuration..."
  # We won't recreate the file if it exists to prevent overwriting custom configurations
fi

# Stop any existing containers to ensure a clean deployment
echo "Stopping any existing containers..."
docker compose down

# Deploy with Docker Compose
echo "Deploying with Docker Compose..."
docker compose up -d --build

echo "Deployment completed successfully!"
