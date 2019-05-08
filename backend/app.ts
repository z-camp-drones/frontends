import express, {NextFunction, Request, Response, Router} from 'express';
import morgan from 'morgan';
import * as path from 'path';
import indexRouter from './routes/index';
import controlRouter from './routes/control';
import dataRouter from './routes/data';
import dataStreamRouter from './routes/data-socket';
import logger from './commons/logging/logger';
import {default as http, Server} from 'http';
import DroneController from './domain/drone-controller';

import {Socket} from 'socket.io';
import CommandHandler from './domain/command-handler';

let appSocket: Socket = null;

const APP_PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const allowCorsRequests = (app: Router) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
};

const allowStaticFilesServing = (app: Router) => {
  app.use(express.static(path.join('public')));
};

const defineApiEndpoints = (app: Router) => {
  app.use('/', indexRouter);
  app.use('/control', controlRouter);
  app.use('/data', dataRouter);
  app.use('/datastream', dataStreamRouter);
};

const createErrorHandlingForNotFound = (app: Router) => {
  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next({status: 404, message: 'Endpoint not found'});
  });
};

const createHttpServer = (app: any) => http.createServer(app);

const createSocket = (server: Server) => require('socket.io')(server);

const configureSocket = (io: Socket) => {
  appSocket = io;

  io.on('connection', (socket: Socket) => {
    logger.info('User connected to socket, %s', socket.id);
    socket.broadcast.emit('hi');

    const commandHandler = new CommandHandler(socket, new DroneController());

    socket.on('disconnect', () => {
      logger.info('User disconnected from socket %s', socket.id);
    });
  });
};
const create = (port: number) => {
  const app = express();

  // view engine setup
  app.set('views', path.join('views'));
  app.set('view engine', 'ejs');

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

  allowStaticFilesServing(app);
  allowCorsRequests(app);

  defineApiEndpoints(app);

  createErrorHandlingForNotFound(app);

  const server = createHttpServer(app);
  const io = createSocket(server);
  configureSocket(io);

  server.listen(port, () => {
    logger.warn('The server is running on: http://localhost:%s ', port);
  });
};

export default create(APP_PORT);

export {appSocket};
