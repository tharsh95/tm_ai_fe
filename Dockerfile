# Use a Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client application files
COPY . .

# Build the client application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the client application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 