# Use an official Node.js runtime as a parent image
FROM node:19

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build TypeScript code
RUN npm run build

# Generate Prisma Client
RUN npx prisma generate

# Expose the port on which your application will run
EXPOSE 3000

# Command to run the application
CMD ["sh", "-c", "npx prisma migrate dev --name init && npx prisma db seed && npm start"]
