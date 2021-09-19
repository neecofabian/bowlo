# Base Image
FROM node:13.12.0-alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
CMD ["npm", "install"]

# add app
COPY . .

# Run app
EXPOSE 5000 
CMD ["npm", "run", "dev"]
