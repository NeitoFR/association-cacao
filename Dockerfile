# Use the official Node.js image as the base image
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY ./strapi/package.json ./strapi/package-lock.json ./

# Install dependencies
RUN npm install

# # Copy the rest of the application code
COPY ./strapi/ ./

# Build the Strapi application
RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]

# FROM node:20-alpine AS prod

# WORKDIR /app

# COPY --from=build /app/package.json /app/package-lock.json /app/dist ./

# RUN npm ci --production

# EXPOSE 1337

# CMD ["npm", "start"]
