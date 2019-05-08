FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies (moves package.json and package-lock.json into the Workdir)
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build-element

# Server
EXPOSE 8080

CMD [ "npm", "run", "serve-element:live" ]
