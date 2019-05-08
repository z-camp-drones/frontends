import {Request, Response, Router} from 'express';
import logger from '../commons/logging/logger';
import {mockMessage} from './helpers';
import {getStateEmitter} from './droneStateEmitter';

const router = Router();

let messageId = 0;

function telloJsServerSideEvents(req: Request, res: Response) {
  const stateEmitter = getStateEmitter();

  let emitMessage = (message: any) => {
    res.write(`id: ${messageId}\n`);
    res.write(`data: ${JSON.stringify(message)}\n\n`);
    messageId += 1;
  };

  stateEmitter.on('message', emitMessage);

  req.on('close', () => {
    console.error('Connection was closed.');
  });
}

function mockedEvents(req: Request, res: Response) {
  let messageId = 0;
  let time = 0;

  let emitMessage = () => {
    const message = mockMessage(time);
    res.write(`id: ${messageId}\n`);
    res.write(`data: ${JSON.stringify(message)}\n\n`);
    logger.info(`Sending mocked data ${messageId}`);
    messageId += 1;
  };
  const timer = setInterval(emitMessage, 2000);

  req.on('close', () => {
    console.error('Connection was closed.');
    clearInterval(timer);
  });
}

router.get('/events', (req: Request, res: Response) => {
  // Server-Send-events Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write('\n');

  telloJsServerSideEvents(req, res);
});

router.get('/mocked-events', (req: Request, res: Response) => {
  // Server-Send-events Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write('\n');

  mockedEvents(req, res);
});

export default router;
