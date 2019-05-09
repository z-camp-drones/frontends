import React, {Component} from 'react';
import './Telemetry.css';

import 'typeface-roboto';
import 'material-icons/iconfont/material-icons.css';
import SingleValueTelemetry from './SingleValueTelemetry';
import {Temperature} from './Temperature';
import styled from 'styled-components';
import Coordinate from './Coordinate';
import TelemetryDto from './telemetry/TelemetryDto';
import TelemetryService from './TelemetryService';
import {ControlBlockStyle} from './styles/ControlBlockStyle';

interface IProps {
  url: string | null;
}

const NoDroneData = styled.div`
color: red;
`;

interface IProps {
  url: string | null;
}

interface IState {
  droneStatus: TelemetryDto | null;
  connectionError: boolean;
}

export default class Telemetry extends Component<IProps, IState> {
  private service: TelemetryService;

  constructor(props: IProps) {
    super(props);
    this.state = {
      droneStatus: null,
      connectionError: false,
    };
    this.service = new TelemetryService(this.props.url);
  }

  componentDidMount() {
    this.service.onTelemetetryReceived((droneStatus: TelemetryDto) =>
      this.updateDroneState(droneStatus),
    );
  }

  componentWillUpdate() {
    this.service.updateUrl(this.props.url);
  }

  render() {
    if (!this.state.droneStatus) {
      return (<ControlBlockStyle><NoDroneData>No Drone Status available yet.</NoDroneData></ControlBlockStyle>);
    }
    let droneStatus = this.state.droneStatus;
    return (<ControlBlockStyle>
      <h1>Telemetry Data</h1>

      <Coordinate coordinate={droneStatus.acceleration} label='Acceleration'/>
      <Coordinate coordinate={droneStatus.speed} label='Speed'/>

      <SingleValueTelemetry value={droneStatus.barometer} label='Barometer' suffix='hPa'/>
      <SingleValueTelemetry value={droneStatus.battery} label='Battery' suffix='%'/>
      <SingleValueTelemetry value={droneStatus.heigh} label='Height' suffix='cm'/>

      <SingleValueTelemetry value={droneStatus.pitch} label='Pitch' suffix='°'/>
      <SingleValueTelemetry value={droneStatus.roll} label='Roll' suffix='°C'/>
      <SingleValueTelemetry value={droneStatus.yaw} label='Yaw' suffix='°C'/>

      <SingleValueTelemetry value={droneStatus.time} label='Time' suffix='s' description='Motors on time'/>
      <SingleValueTelemetry value={droneStatus.tof} label='Time of Flight' suffix='s'/>

      <Temperature temperature={droneStatus.temperature}/>

    </ControlBlockStyle>);
  }

  private updateDroneState(droneStatus: TelemetryDto) {
    this.setState({
      droneStatus: droneStatus,
    });
  }
}