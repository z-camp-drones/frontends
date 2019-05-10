import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-command-log',
  templateUrl: './command-log.component.html',
  styleUrls: ['./command-log.component.scss'],
})
export class CommandLogComponent implements OnInit {

  events: string[] = [];
  speed: number = 100;

  constructor() {
    document.addEventListener('drone-control-event', (event: CustomEvent) => {
      const customEvent = event.detail as DroneCustomEvent;
      const state = customEvent.detail as DroneState;
      if (customEvent.name === 'movement' && state && !state.height && !state.pitch && !state.roll && !state.yaw) {
        return;
      }
      this.events.push(this.beautifyCommand(customEvent));
      this.scrollToBottom();
    });

    document.addEventListener('drone-speed-change-event', (event: CustomEvent) => {
      this.speed = event.detail;
    });
  }

  ngOnInit() {
  }

  scrollToBottom() {
    setTimeout(() => {
      const commandLogEntries = document.querySelector('.command-entries');
      commandLogEntries.scrollTop = commandLogEntries.scrollHeight - commandLogEntries.clientHeight;
    });
  }

  beautifyCommand(event: DroneCustomEvent): string {
    if (event.name === 'takeoff_land') {
      return 'TAKEOFF or LAND';
    } else if (event.name === 'emergency') {
      return 'Emergency';
    } else if (event.name === 'flip') {
      const flipDirection = (event.detail as FlipDirection).direction;
      return 'FLIP ' + flipDirection;
    }
    const droneState = event.detail as DroneState;
    let command = '';
    if (droneState.pitch || droneState.roll) {
      if (droneState.pitch) {
        command += droneState.pitch > 0 ? 'FORWARD ' : 'BACK ';
      }
      command += droneState.pitch && droneState.roll ? ' & ' : '';
      if (droneState.roll) {
        command += droneState.roll > 0 ? 'RIGHT ' : 'LEFT ';
      }
    } else if (droneState.height || droneState.yaw) {
      if (droneState.height) {
        command += droneState.height > 0 ? 'UP' : 'DOWN';
      }
      command += droneState.height && droneState.yaw ? ' & ' : '';
      if (droneState.yaw) {
        command += droneState.yaw > 0 ? 'ROTATE RIGHT' : 'ROTATE LEFT';
      }
    }
    return command + ' - SPEED ' + this.speed;
  }

}

export type MovementEvent = 'takeoff_land' | 'movement' | 'emergency' | 'flip';

export interface DroneCustomEvent {
  name: MovementEvent;
  detail: DroneState | FlipDirection;
}

export interface DroneState {
  pitch: number;
  roll: number;
  yaw: number;
  height: number;
}

export interface FlipDirection {
  direction: string;
}
