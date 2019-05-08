FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies (moves package.json and package-lock.json into the Workdir)
COPY package*.json ./

RUN npm install

COPY . .

# Node Express
EXPOSE 3000
# Command
EXPOSE 8889/udp
# Response
EXPOSE 8001/udp
# State
EXPOSE 8890/udp
# Video
EXPOSE 11111/udp

CMD [ "npm", "run", "prod" ]