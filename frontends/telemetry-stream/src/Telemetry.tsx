import React, {Component} from 'react';

import 'typeface-roboto';
import 'material-icons/iconfont/material-icons.css';
import styled from 'styled-components';
import TelemetryDto from './telemetry/TelemetryDto';
import TelemetryService from './TelemetryService';
import {ControlBlockStyle} from './styles/ControlBlockStyle';
import TelemetryData from './TelemetryData';

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
    let droneStatus = this.state.droneStatus;
    return (
      <ControlBlockStyle>
        <div className="telemetry-title">Telemetry Data</div>
        {droneStatus !== null ?
          <NoDroneData>No Drone Status available yet.</NoDroneData> :
          <TelemetryData droneData={droneStatus}></TelemetryData>
        }
      </ControlBlockStyle>
    );
  }

  private updateDroneState(droneStatus: TelemetryDto) {
    this.setState({droneStatus: droneStatus});
  }
}