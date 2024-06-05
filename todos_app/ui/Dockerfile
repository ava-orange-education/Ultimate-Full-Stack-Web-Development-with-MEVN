# Use an official Node runtime as a parent image
FROM node:16 as build-ui

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json .

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Running the build
CMD ["npm", "run", "dev"]