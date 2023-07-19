# Use the official Node.js 14 base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the TypeScript source code to the container
COPY . .


# Expose the desired port
EXPOSE 8080

# Set the environment variables
ENV DATABASE_URI mongodb://127.0.0.1:27017/simplicityDB

# Start the Node.js application
CMD ["npm", "start"]
