# Stage 1: Build the UI
FROM node:16 as build-ui
# Set the working directory for the UI
WORKDIR /app/ui
# Copy UI package.json and package-lock.json
COPY ui/package*.json ./
# Install UI dependencies
RUN npm install
# Copy the rest of the UI source code
COPY ui/ .

RUN npm install vue-tsc vite -g

RUN npx vue-tsc --version
RUN npx vite --version
# Build the UI
RUN npm run build

# Stage 2: Build the API
FROM node:16 as build-api
# Set the working directory for the API
WORKDIR /app/api
# Copy API package.json and package-lock.json
COPY api/package.json ./
COPY api/tsconfig.json ./
# Install API dependencies
RUN npm install
# Copy the rest of the API source code
RUN npm install cross-env webpack webpack-cli -g

COPY api/ .
# Build the API
RUN npm run build-prod


# Stage 3: Final stage - Combine UI and API
FROM node:16-alpine
# Expose the port the API is running on
EXPOSE 3080
# Set the working directory to where API is copied
WORKDIR /app
# Copy built UI assets from the UI build stage
COPY --from=build-ui /app/ui/dist /app/ui/dist
# Copy package.json and package-lock.json
COPY /api/package*.json /app/
# Install production dependencies
RUN npm install --only=production
# Copy built API files from the API build stage
COPY --from=build-api /app/api/dist /app/


# Run the API
CMD ["node", "api.bundle.js"]
