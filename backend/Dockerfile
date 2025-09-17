# Uses a Node.js base image for building the backend application
# This Dockerfile is used to build the backend application using Node.js
FROM node:22

# Goes to the app directory
WORKDIR /app

# Copies the package.json and package-lock.json files to the app directory
COPY package*.json ./

# Installs the dependencies defined in package.json
RUN npm install --production

# Copies the rest of the application code to the app directory
COPY . .

# Sets the port environment variable for the Node.js application
ENV PORT=3000

# Exposes port 3000 for the application
EXPOSE 3000

# Starts the Node.js application
CMD ["npm", "start"]