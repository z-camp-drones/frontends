import {Socket} from 'socket.io';
import DroneController from './drone-controller';
import {MovementCommand} from './movement-command';
import {CommandType} from './command-type';
import logger from '../commons/logging/logger';

interface RecordedCommand {
  timestamp: Date;
  commandType: CommandType;
  movementCommand?: MovementCommand;
}

export default class CommandHandler {
  private isRecording: boolean;
  private recordedCommands: RecordedCommand[];

  constructor(
    private socket: Socket,
    private droneController: DroneController,
  ) {
    this.isRecording = false;
    this.handleMovementChange = this.handleMovementChange.bind(this);
    this.handleTakeOffOrLand = this.handleTakeOffOrLand.bind(this);
    this.handleEmergencyLand = this.handleEmergencyLand.bind(this);

    this.startListeningToClientCommands();
  }

  private startListeningToClientCommands() {
    this.socket.on(CommandType.TAKEOFF_LAND, this.handleTakeOffOrLand);
    this.socket.on(CommandType.MOVEMENT, this.handleMovementChange);
    this.socket.on(CommandType.EMERGENCY, this.handleEmergencyLand);
    this.socket.on(CommandType.START_RECORDING, this.startRecording);
    this.socket.on(CommandType.STOP_RECORDING, this.stopRecording);
  }

  private handleMovementChange(command: MovementCommand) {
    logger.info('handleMovementChange, isRecording:%s', this.isRecording);
    if (this.isRecording) {
      this.recordCommand({timestamp: new Date(), commandType: CommandType.MOVEMENT, movementCommand: command});
    }
    this.droneController.updateMovement(command);
  }

  private handleTakeOffOrLand() {
    logger.info('handleTakeOffOrLand, isRecording:%s', this.isRecording);
    if (this.isRecording) {
      this.recordCommand({timestamp: new Date(), commandType: CommandType.TAKEOFF_LAND, movementCommand: null});
    }
    this.droneController.takeOffOrLand();
  }

  private handleEmergencyLand() {
    logger.info('handleEmergencyLand, isRecording:%s', this.isRecording);
    if (this.isRecording) {
      this.recordCommand({timestamp: new Date(), commandType: CommandType.EMERGENCY, movementCommand: null});
    }
    this.droneController.emergencyLand();
  }

  private startRecording() {
    logger.info('Starting recording');
    this.isRecording = true;
    this.recordedCommands = [];
  }

  private stopRecording() {
    logger.info('Stopping recording');
    this.isRecording = false;
  }

  private recordCommand(recordedCommand: RecordedCommand): void {
    logger.info('New drone command recorded: %s', recordedCommand);
    this.recordedCommands.push(recordedCommand);
  }
}
