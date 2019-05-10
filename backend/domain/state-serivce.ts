import { MovementCommand } from "./commands";

export class StateService {
  private droneIsAirborne = false;
  private droneState: DroneState = {
    roll: 0,
    pitch: 0,
    height: 0,
    yaw: 0,
  };

  updateDroneState(command: MovementCommand) {
    this.droneState = {
      ...this.droneState,
      ...command,
    };
    return this.droneState;
  }

  setAirborne(airborne: boolean) {
    this.droneIsAirborne = airborne;
  }

  isAirborne() {
    return this.droneIsAirborne;
  }
}

export interface DroneState {
  roll: number;
  pitch: number;
  height: number;
  yaw: number;
}