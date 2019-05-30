import io from 'socket.io-client';
import {CommunicationService} from '../CommunicationService';


enum MovementCommands {
  MOVEMENT = 'movement',
  TAKEOFF_LAND = 'takeoff_land',
  EMERGENCY = 'emergency',
  CONNECT = 'init_connection',
}

export class ReplayController {
  private socket: SocketIOClient.Socket;
  private communicationService: CommunicationService;
  private shouldStop = false;

  constructor() {
    this.socket = io('http://localhost:3001');
    this.communicationService = new CommunicationService();
  }

  private sleep(ms: number) {
    console.log(`sleeping ${ms}`);
    if (this.shouldStop) {
      return Promise.reject('Stopped');
    }
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public doFlight() {

    this.shouldStop = false;
    return this.send(MovementCommands.CONNECT)
      .then(() => this.sleep(3000))
      .then(() => this.send(MovementCommands.TAKEOFF_LAND))
      .then(() => this.sleep(5000))
      .then(() => this.send(MovementCommands.MOVEMENT, {yaw: 50, height: 50, pitch: 50, roll: 50}))
      .then(() => this.sleep(2000))
      .then(() => this.send(MovementCommands.MOVEMENT, {yaw: 0, height: -30, pitch: 0, roll: 0}))
      .then(() => this.sleep(1000))
      .then(() => this.bounce())
      .then(() => this.send(MovementCommands.MOVEMENT, {yaw: 0, height: 0, pitch: 0, roll: 0}))
      .then(() => this.sleep(1000))
      .then(() => this.send(MovementCommands.TAKEOFF_LAND));

  }

  private sleep1000() {
    return this.sleep(1000);
  }

  private sleep2000() {
    return this.sleep(2000);
  }

  private sleep5000() {
    return this.sleep(5000);
  }

  private sleep3000() {
    return this.sleep(3000);
  }

  public stop() {
    this.shouldStop = true;
    this.send(MovementCommands.MOVEMENT, {});
  }

  private send(command: MovementCommands, args: any = {}) {
    if (this.shouldStop) {
      return Promise.reject('Stopped');
    }
    console.log(`sending ${command} ${JSON.stringify(args)}`);
    this.socket.emit(command, args);
    return Promise.resolve();
  }


  private bounce() {
    let h = 50;
    return this.send(MovementCommands.MOVEMENT, {height: h})
      .then(() => this.sleep(1000))
      .then(() => this.send(MovementCommands.MOVEMENT, {height: -h}))
      .then(() => this.sleep(1200))
      .then(() => this.send(MovementCommands.MOVEMENT, {height: h}))
      .then(() => this.sleep(1500))
      .then(() => this.send(MovementCommands.MOVEMENT, {height: -h}))
      .then(() => this.sleep(1600))
      .then(() => this.send(MovementCommands.MOVEMENT, {height: h}))
      .then(() => this.sleep(1500))
      .then(() => this.send(MovementCommands.MOVEMENT, {height: -h}))
      .then(() => this.sleep(1200))
      .then(() => this.send(MovementCommands.MOVEMENT, {height: -h}))
      .then(() => this.sleep(1000));
  }
}
