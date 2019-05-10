import { AdvancedMovement } from './keys';
import io from 'socket.io-client';
import { CommunicationService } from '../CommunicationService';

export interface AdvancedDroneState {
  yaw: number;
  height: number;
  speed: number;
}

enum MovementCommands {
  MOVEMENT = 'movement',
  TAKEOFF_LAND = 'takeoff_land',
  EMERGENCY = 'emergency',
}

export class AdvancedDroneController {
  private socket: SocketIOClient.Socket;
  private droneState: AdvancedDroneState;
  private communicationService: CommunicationService;

  constructor() {
    this.socket = io('http://localhost:3001');
    this.droneState = {
      yaw: 0,
      height: 0,
      speed: 100,
    };
    this.communicationService = new CommunicationService();
  }

  public sendMovementCommand(movement: AdvancedMovement, value: number) {
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

  public sendSpeedChangeCommand(speed: number) {
    this.droneState.speed = speed;
    this.socket.emit('speed_change', {speed: speed});
  }

  public getCurrentSpeed() {
    return this.droneState.speed;
  }
}
