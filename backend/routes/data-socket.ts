import { Request, Response, Router } from "express";
import logger from "../commons/logging/logger";
import { Socket } from "socket.io";
import { appSocket } from "../app";
import { mockMessage } from "./helpers";

const sdk = require("../lib/tellojs");

const router = Router();
let timer: any = null;
let stateEmitter: any = null;
let socket: Socket = null;

router.get("/events", (req: Request, res: Response) => {
  startEventStream();
  res.sendStatus(200);
});
router.delete("/events", (req: Request, res: Response) => {
  stopEventStream();
  res.sendStatus(200);
});
router.get("/mocked-events", (req: Request, res: Response) => {
  startMockEventStream();
  res.sendStatus(200);
});

router.delete("/mocked-events", (req: Request, res: Response) => {
  stopMockEventStream();
  res.sendStatus(200);
});

function stopEventStream() {
  stateEmitter.off("message", pushDataOntoSocket);
}

function getSocket() {
  if (socket === null) {
    socket = appSocket;
  }
  return socket;
}

function pushDataOntoSocket(message: string) {
  getSocket().emit("drone-data", message);
}

function startEventStream() {
  if (stateEmitter === null) {
    stateEmitter = sdk.receiver.state.bind(); // Binding to port of state
    stateEmitter.on("close", () => {
      stateEmitter = null;
    });
  }
  stateEmitter.on("message", pushDataOntoSocket);

  // TODO: handle socket disconnect
}

function startMockEventStream() {
  let messageId = 0;
  let time = 0;

  let emitMessage = () => {
    const message = mockMessage(time);
    logger.info(`Sending mocked data ${messageId}`);
    pushDataOntoSocket(JSON.stringify(message));

    messageId += 1;
  };
  timer = setInterval(emitMessage, 2000);

  // TODO: handle socket close to stop interval
}

function stopMockEventStream() {
  clearInterval(timer);
}

export default router;
