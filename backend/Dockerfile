FROM oven/bun:latest

WORKDIR /app

# Install required packages
RUN apt-get update -y && apt-get install -y openssl

COPY . .

# Install dependencies
RUN bun install

# Create entrypoint script for Prisma operations
RUN echo '#!/bin/sh\n\
echo "Generating Prisma client..."\n\
bun prisma generate\n\
echo "Running migrations..."\n\
bun prisma migrate deploy\n\
echo "Starting application..."\n\
exec bun run start' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Create seed script with proper environment variable handling
RUN echo '#!/bin/sh\n\
echo "Running with DATABASE_URL=$DATABASE_URL"\n\
bun src/scripts/seed-all.ts' > /app/seed.sh && chmod +x /app/seed.sh

EXPOSE 8000

CMD ["/app/entrypoint.sh"]
