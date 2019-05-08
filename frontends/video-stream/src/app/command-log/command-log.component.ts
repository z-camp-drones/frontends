import { DroneCustomEvent } from './../../../../shared/CommunicationService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-log',
  templateUrl: './command-log.component.html',
  styleUrls: ['./command-log.component.scss']
})
export class CommandLogComponent implements OnInit {

  events: DroneCustomEvent[] = [];

  constructor() {
    document.addEventListener('drone-control-event', (event: CustomEvent) => {
      const customEvent = event.detail as DroneCustomEvent;
      const state = customEvent.detail;
      if ( state && state.height === 0 && state.pitch === 0 && state.roll === 0 && state.yaw === 0) {
        return;
      } else {
        this.events.push(customEvent);
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

}
