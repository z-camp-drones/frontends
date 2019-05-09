import { BasicMovement } from './keys';
import io from 'socket.io-client';
import { CommunicationService } from '../CommunicationService';

export interface BasicDroneState {
  pitch: number;
  roll: number;
}

enum MovementCommands {
  MOVEMENT = 'movement',
  TAKEOFF_LAND = 'takeoff_land',
  EMERGENCY = 'emergency',
}

export class BasicDroneController {
  private socket: SocketIOClient.Socket;
  private droneState: BasicDroneState;
  private communicationService: CommunicationService;

  constructor() {
    this.socket = io('http://localhost:3001');
    this.droneState = {
      pitch: 0,
      roll: 0,
    };
    this.communicationService = new CommunicationService();
  }

  public sendMovementCommand(movement: BasicMovement, value: number) {
    this.droneState = movement.adaptDroneState(this.droneState, value);
    this.socket.emit(MovementCommands.MOVEMENT, this.droneState);
    this.communicationService.dispatchEvent(MovementCommands.MOVEMENT, this.droneState);
  }

  public sendTakeOffOrLandCommand() {
    this.socket.emit(MovementCommands.TAKEOFF_LAND, {});
    this.communicationService.dispatchEvent(MovementCommands.TAKEOFF_LAND);
  }

  public sendEmergencyCommand() {
    this.socket.emit(MovementCommands.EMERGENCY, {});
    this.communicationService.dispatchEvent(MovementCommands.EMERGENCY);
  }
}
