import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-log',
  templateUrl: './command-log.component.html',
  styleUrls: ['./command-log.component.scss']
})
export class CommandLogComponent implements OnInit {

  events: string[] = [];

  constructor() {
    document.addEventListener('drone-control-event', (event: CustomEvent) => {
      const customEvent = event.detail as DroneCustomEvent;
      const state = customEvent.detail;
      if (state && !state.height && !state.pitch && !state.roll && !state.yaw) {
        return;
      } else {
        this.events.push(this.beautifyCommand(customEvent));
        this.scrollToBottom();
      }
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
    if (!event.detail) {
      return 'TAKEOFF or LAND';
    }
    let command = '';
    if (event.detail.pitch || event.detail.roll) {
      if (event.detail.pitch) {
        command += event.detail.pitch > 0 ? 'FORWARD ' : 'BACK ';
      }
      command += event.detail.pitch && event.detail.roll ? ' & ' : '';
      if (event.detail.roll) {
        command += event.detail.roll > 0 ? 'RIGHT ' : 'LEFT ';
      }
    } else if (event.detail.height || event.detail.yaw) {
      if (event.detail.height) {
        command += event.detail.height > 0 ? 'UP' : 'DOWN';
      }
      command += event.detail.height && event.detail.yaw ? ' & ' : '';
      if (event.detail.yaw) {
        command += event.detail.yaw > 0 ? 'ROTATE RIGHT' : 'ROTATE LEFT';
      }
    }
    return command + ' - SPEED 100';
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
