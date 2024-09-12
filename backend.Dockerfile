# Use the latest Node.js image
FROM node:latest

# Set the working directory
WORKDIR /app

COPY apps/backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend application
COPY apps/backend/ ./

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3022
# Create a directory for persistent data
RUN mkdir -p /app/data

# Set environment variable for the database URL
ENV DATABASE_URL="file:/app/data/app.db"

# Volume configuration for persistent data
VOLUME /app/data

RUN chmod +x /app/start.sh

# Command to run the application
CMD ["./start.sh"]

# Example command to run the container
# docker run -p 3022:3022 -v ./data:/app/data --name tfoot-backend -d tfoot-backend