import {MovementCommand} from './movement-command';

const sdk = require('../lib/tellojs');

export default class DroneController {
  private droneIsAirborne = false;

  constructor() {
    sdk.control.connect()
      .then(() => console.log('Connected to drone'))
      .catch((e: any) => console.log('Error connecting to drone:', e));
  }

  updateMovement(command: MovementCommand): void {
    sdk.set
      .rc(
        command.roll || 0,
        command.pitch || 0,
        command.height || 0,
        command.yaw || 0,
      )
      .catch((e: any) => console.log('Error sending RC command to drone: ', e));
  }

  takeOffOrLand(): void {
    // TODO: use drone data instead to determine current state
    if (this.droneIsAirborne) {
      this.land();
    } else {
      this.takeOff();
    }
  }

  emergencyLand(): void {
    sdk.control
      .emergency()
      .then(() => {
        console.log('Emergency landed successfully');
        this.droneIsAirborne = false;
      })
      .catch((e: any) => console.log('Error while emergency landing: ', e));
  }

  private takeOff(): void {
    return sdk.control
      .takeOff()
      .then(() => (this.droneIsAirborne = true))
      .catch((e: any) => console.log('Error while taking off', e));
  }

  private land(): void {
    return sdk.control
      .land()
      .then(() => (this.droneIsAirborne = false))
      .catch((e: any) => console.log('Error while landing', e));
  }
}
