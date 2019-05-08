import {Movement} from './keys';
import io from 'socket.io-client';
import { CommunicationService } from '../../../shared/CommunicationService';

export interface DroneState {
  pitch: number;
  roll: number;
  yaw: number;
  height: number;
}

enum MovementCommands {
  MOVEMENT = 'movement',
  TAKEOFF_LAND = 'takeoff_land',
  EMERGENCY = 'emergency',
}

export class DroneController {
  private socket: SocketIOClient.Socket;
  private droneState: DroneState;
  private communicationService: CommunicationService;

  constructor() {
    this.socket = io('http://localhost:3001');
    this.droneState = {
      pitch: 0,
      roll: 0,
      yaw: 0,
      height: 0,
    };
    this.communicationService = new CommunicationService();
  }

  public sendMovementCommand(movement: Movement, value: number) {
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
