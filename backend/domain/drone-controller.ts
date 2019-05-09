import {MovementCommand} from './movement-command';
import {StateService} from './state-serivce';

const sdk = require('../lib/tellojs');

export default class DroneController {

  constructor(private stateService: StateService) {
  }

  connect() {
    return sdk.control.connect()
      .then(() => console.log('Connected to drone'))
      .catch((e: any) => console.log('Error connecting to drone:', e));
  }

  updateMovement(command: MovementCommand): void {
    const updatedDroneState = this.stateService.updateDroneState(command);
    sdk.set
      .rc(
        updatedDroneState.roll || 0,
        updatedDroneState.pitch || 0,
        updatedDroneState.height || 0,
        updatedDroneState.yaw || 0,
      )
      .catch((e: any) => console.log('Error sending RC command to drone: ', e));
  }

  takeOffOrLand(): void {
    // TODO: use drone data instead to determine current state
    if (this.stateService.isAirborne()) {
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
        this.stateService.setAirborne(false);
      })
      .catch((e: any) => console.log('Error while emergency landing: ', e));
  }

  private takeOff(): void {
    return sdk.control
      .takeOff()
      .then(() => (this.stateService.setAirborne(true)))
      .catch((e: any) => console.log('Error while taking off', e));
  }

  private land(): void {
    return sdk.control
      .land()
      .then(() => (this.stateService.setAirborne(false)))
      .catch((e: any) => console.log('Error while landing', e));
  }
}
