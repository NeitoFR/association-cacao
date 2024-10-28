# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY ./strapi/package.json ./strapi/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./strapi/ .

# Build the Strapi application
RUN npm run build

# Expose the port that the Strapi application will run on
EXPOSE 1337

# Start the Strapi application
CMD ["npm", "start"]