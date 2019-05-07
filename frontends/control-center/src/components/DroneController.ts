import { Movement } from './keys';
import io from 'socket.io-client';

export interface DroneState {
	pitch: number;
	roll: number;
	yaw: number;
	height: number;
}

export class DroneController {

	private socket: SocketIOClient.Socket;
	private droneState: DroneState;

	constructor() {
		this.socket = io('http://localhost:3001');
		this.droneState = {
			pitch: 0,
			roll: 0,
			yaw: 0,
			height: 0,
		};
	}

	public sendMovementCommand(movement: Movement, value: number) {
		this.droneState = movement.adaptDroneState(this.droneState, value);
		this.socket.emit('movement', this.droneState);
	}

	public sendTakeOffOrLandCommand() {
		this.socket.emit('takeoff_land', {});
	}

	public sendEmergencyCommand() {
		this.socket.emit('emergency', {});
	}
}
