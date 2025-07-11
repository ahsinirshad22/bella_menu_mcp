# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM n8nio/n8n:latest

ENV MCP_MENU_API_URL=https://admin.bellamasala.it
ENV MCP_MENU_API_SECRET_KEY="fe1ca9859cefff19959d57aadc17187e"

EXPOSE 3000

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist /home/node/.n8n/nodes/dist
COPY --from=builder /usr/src/app/package.json /home/node/.n8n/nodes/package.json

# n8n will install the dependencies for the custom node on startup
# The entrypoint is the one from the base n8n image
