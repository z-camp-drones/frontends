import React, {Component} from 'react';
import './App.css';
import 'eventsource-polyfill';
import TelemetryDto from './telemetry/TelemetryDto';
import Telemetry from './Telemetry';
import {BatteryStatus} from './BatteryStatus';


interface IProps {

}

interface IState {
  droneStatus: TelemetryDto | null;
  url: string;
}

export default class App extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      droneStatus: null,
      url: 'http://localhost:3001',
    };
  }

  render() {
    return (
      <div className="App">
        <BatteryStatus url={this.state.url}/>
        <Telemetry url={this.state.url}/>
      </div>
    );
  }
}



