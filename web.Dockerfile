
# Use the latest Node.js image
FROM node:latest

# Set the working directory
WORKDIR /app
RUN npm install -g pnpm
COPY ./ ./

# Install dependencies
RUN pnpm install

# Copy the rest of the backend application
#COPY apps/web/ ./

# Set environment variable for the database URL
ENV NEXT_PUBLIC_API_URL=http://localhost:3022

RUN pnpm run build --filter web

# Expose the port the app runs on
EXPOSE 3000


WORKDIR /app/apps/web
# Command to run the application
CMD ["pnpm", "start"]

# Example command to run the container
# docker run -p 3000:3000 --name tfoot-web -d tfoot-web