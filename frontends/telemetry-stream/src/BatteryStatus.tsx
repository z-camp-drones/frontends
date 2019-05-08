import React, { Component } from "react";
import SingleValueTelemetry from "./SingleValueTelemetry";
import TelemetryDto, { TemperatureDto } from "./telemetry/TelemetryDto";
import TelemetryService from "./TelemetryService";
import { Temperature } from "./Temperature";

interface IProps {
  url: string | null;
}

interface IState {
  battery: number | null;
  connectionError: boolean;
  temperature: TemperatureDto | null;
}

export class BatteryStatus extends Component<IProps, IState> {
  private service: TelemetryService;

  constructor(props: IProps) {
    super(props);
    this.state = {
      battery: 0,
      connectionError: false,
      temperature: null
    };
    this.service = new TelemetryService(this.props.url);
  }

  componentDidMount() {
    this.service.onTelemetetryReceived((droneStatus: TelemetryDto) =>
      this.updateDroneState(droneStatus)
    );
  }

  componentWillUpdate() {
    this.service.updateUrl(this.props.url);
  }

  render() {
    if (this.state.connectionError) {
      return <div>Connection not established.</div>;
    }
    if (!this.state.battery) {
      return <div>No Data yet. Loading...</div>;
    }
    if (this.state.battery) {
      return (
        <div>
          <SingleValueTelemetry
            value={this.state.battery}
            label="Battery"
            suffix="%"
          />
          {!this.state.temperature || (
            <Temperature temperature={this.state.temperature} />
          )}
        </div>
      );
    }
  }

  private updateDroneState(droneStatus: TelemetryDto) {
    this.setState({
      battery: droneStatus.battery,
      connectionError: false,
      temperature: droneStatus.temperature
    });
  }
}
