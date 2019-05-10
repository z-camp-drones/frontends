import { BasicMovement } from './keys';
import io from 'socket.io-client';
import { CommunicationService } from '../CommunicationService';

export interface BasicDroneState {
  pitch: number;
  roll: number;
  speed: number;
}

enum MovementCommands {
  MOVEMENT = 'movement',
  TAKEOFF_LAND = 'takeoff_land',
  EMERGENCY = 'emergency',
  FLIP = 'flip',
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
      speed: 100,
    };
    this.communicationService = new CommunicationService();
  }

  public sendMovementCommand(movement: BasicMovement, value: number) {
    this.droneState = movement.adaptDroneState(this.droneState, value);
    this.socket.emit(MovementCommands.MOVEMENT, this.droneState);
    this.communicationService.dispatchEvent(MovementCommands.MOVEMENT, this.droneState);
  }

  public sendFlipCommand(direction: string) {
    this.socket.emit(MovementCommands.FLIP, { direction });
    this.communicationService.dispatchEvent(MovementCommands.FLIP, { direction });
  }

  public sendSpeedChangeCommand(speed: number) {
    this.droneState.speed = speed;
    this.socket.emit('speed_change', {speed: speed});
  }

  public getCurrentSpeed() {
    return this.droneState.speed;
  }
}
