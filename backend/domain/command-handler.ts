import {Socket} from 'socket.io';
import DroneController from './drone-controller';
import { MovementCommand, FlipCommand } from './commands';
import {CommandType} from './command-type';

export default class CommandHandler {
  constructor(
    private socket: Socket,
    private droneController: DroneController
  ) {
    this.handleMovementChange = this.handleMovementChange.bind(this);
    this.handleTakeOffOrLand = this.handleTakeOffOrLand.bind(this);
    this.handleEmergencyLand = this.handleEmergencyLand.bind(this);
    this.handleFlip = this.handleFlip.bind(this);

    this.startListeningToClientCommands();
  }

  private startListeningToClientCommands() {
    this.socket.on(CommandType.TAKEOFF_LAND, this.handleTakeOffOrLand);
    this.socket.on(CommandType.MOVEMENT, this.handleMovementChange);
    this.socket.on(CommandType.EMERGENCY, this.handleEmergencyLand);
    this.socket.on(CommandType.FLIP, this.handleFlip)
  }

  private handleMovementChange(command: MovementCommand) {
    this.droneController.updateMovement(command);
  }

  private handleTakeOffOrLand() {
    this.droneController.takeOffOrLand();
  }

  private handleEmergencyLand() {
    this.droneController.emergencyLand();
  }

  private handleFlip(flipCommand: FlipCommand) {
    this.droneController.flip(flipCommand.direction);
  }
}
