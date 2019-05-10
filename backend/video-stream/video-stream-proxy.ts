import logger from '../commons/logging/logger';

const WebSocket = require('ws');
const http = require('http');

let createSocketServer = (websocketPort: number) => {

  logger.info(`Creating new WebsocketServer on Port ${websocketPort}`);
  const socketServer = new WebSocket.Server({port: websocketPort, perMessageDeflate: false});
  let connectionCount = 0;

  socketServer.on('connection', (socket: any) => {
    connectionCount++;
    logger.info(`New WebSocket Connection: (${connectionCount} total)`);
    socket.on('close', (code: number, message: string) => {
      connectionCount--;
      logger.info(`Disconnected WebSocket (${connectionCount} total)`);
    });
  });
  const broadcast = (data: any) => {
    socketServer.clients.forEach((client: any) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  return {socketServer, broadcast};
};


const createVideoStreamServer = (STREAM_PORT: number, SOCKET_PORT: number) => {
  const {broadcast} = createSocketServer(SOCKET_PORT);

  // HTTP Server to accept incomming MPEG-TS Stream from ffmpeg
  const streamServer = http.createServer((request: any, response: any) => {
    const params = request.url.substr(1).split('/');

    if (params[0] !== 'video') {
      response.end();
    }

    response.connection.setTimeout(0);
    console.log(
      'Stream Connected: ' +
      request.socket.remoteAddress + ':' +
      request.socket.remotePort,
    );
    request.on('data', (data: any) => {
      broadcast(data);
    });
    request.on('end', () => {
      console.log('close');
    });

    // Record the stream to a local file?
  }).listen(STREAM_PORT);

};

export default createVideoStreamServer;
