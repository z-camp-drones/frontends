export class CommunicationService {
  private target: Document;

  constructor() {
    this.target = document;
  }

  public dispatchEvent(event: MovementEvent, detail?: any) {
    const eventDetails = {
      name: event,
      detail,
    };
    this.target.dispatchEvent(
      new CustomEvent('drone-control-event', {
        detail: eventDetails,
      }),
    );
  }

}

export type MovementEvent = 'takeoff_land' | 'movement' | 'emergency';

export interface DroneCustomEvent {
  name: MovementEvent;
  detail: DroneState;
}

export interface DroneState {
  pitch: number;
  roll: number;
  yaw: number;
  height: number;
}
