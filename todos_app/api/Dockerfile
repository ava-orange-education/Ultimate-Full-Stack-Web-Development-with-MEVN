# Use an official Node runtime as a parent image
FROM node:16 as build-api

# change the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json .

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Your app binds to port 3080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3080

RUN npm run build

# Running the build
CMD ["node", "dist/api.bundle.js"]