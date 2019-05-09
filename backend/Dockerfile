FROM jrottenberg/ffmpeg:3.3-alpine
FROM node:10

LABEL name="tello-backend"

# copy ffmpeg bins from first image
COPY --from=0 / /

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies (moves package.json and package-lock.json into the Workdir)
COPY package*.json ./

RUN npm install

COPY . .

# Node Express
EXPOSE 3001
# Command
EXPOSE 8889/udp
# Response
EXPOSE 8001/udp
# State
EXPOSE 8890/udp
# Video
EXPOSE 11111/udp
# Video Stream websocket Express
EXPOSE 8083

CMD [ "npm", "run", "start" ]