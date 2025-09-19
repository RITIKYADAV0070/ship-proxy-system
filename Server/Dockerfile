# Use official Node.js image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy server code
COPY index.js package.json ./

# Install dependencies (if any)
RUN npm install

# Expose offshore proxy port
EXPOSE 9999

# Start server
CMD ["node", "index.js"]
