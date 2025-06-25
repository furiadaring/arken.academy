#!/bin/bash

# Exit on error
set -e

echo "Shutting down containers..."
docker compose down

echo "Containers have been stopped successfully!"
