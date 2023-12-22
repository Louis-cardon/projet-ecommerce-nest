# Stage 1: Build
FROM node:18 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
# This ensures that the dependencies will be cached unless the package.json or package-lock.json files change
COPY package*.json ./
RUN npm install

# Copiez le reste du code de l'application
COPY . .

# Générez le client Prisma
RUN npx prisma generate

# Construisez l'application NestJS
RUN npm run build

# Stage 2: Runtime
FROM node:18-slim

# Install necessary runtime dependencies
RUN apt update && apt install -y libssl-dev dumb-init --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Create a non-root user and change ownership of files
RUN useradd -m myuser
USER myuser

# Copy built files and dependencies from the build stage
COPY --from=build --chown=myuser:myuser /usr/src/app/dist ./dist
COPY --from=build --chown=myuser:myuser /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=myuser:myuser /usr/src/app/package*.json ./

# Set environment variables
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Define the runtime command
CMD ["dumb-init", "node", "dist/main"]
