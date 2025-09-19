# Use official Node.js image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy client code
COPY index.js package.json ./

# Install dependencies (if any)
RUN npm install

# Expose ship proxy port
EXPOSE 8080

# Configure offshore host via environment variable
ENV OFFSHORE_HOST=host.docker.internal
ENV OFFSHORE_PORT=9999

# Start client
CMD ["node", "index.js"]
