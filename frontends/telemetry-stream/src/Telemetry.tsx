import React, {Component} from 'react';
import TelemetryDto from './telemetry/TelemetryDto';
import './Telemetry.css';
import {Coordinate} from './Coordinate';
import 'typeface-roboto';
import 'material-icons/iconfont/material-icons.css';
import SingleValueTelemetry from './SingleValueTelemetry';
import {Temperature} from './Temperature';


export class Telemetry extends Component<{ droneStatus: TelemetryDto | null }> {
    render() {
        if (!this.props.droneStatus) {
            return (<div>No Drone Status available yet.</div>);
        }
        return (
            <div>
                <h1>Telemetry Data</h1>


                <Coordinate coordinate={this.props.droneStatus.acceleration} label='Acceleration'/>
                <Coordinate coordinate={this.props.droneStatus.speed} label='Speed'/>

                <SingleValueTelemetry value={this.props.droneStatus.barometer} label='Barometer' suffix='hPa'/>
                <SingleValueTelemetry value={this.props.droneStatus.battery} label='Battery' suffix='%'/>
                <SingleValueTelemetry value={this.props.droneStatus.heigh} label='Height' suffix='cm'/>

                <SingleValueTelemetry value={this.props.droneStatus.pitch} label='Pitch' suffix='°'/>
                <SingleValueTelemetry value={this.props.droneStatus.roll} label='Roll' suffix='°C'/>
                <SingleValueTelemetry value={this.props.droneStatus.yaw} label='Yaw' suffix='°C'/>

                <SingleValueTelemetry value={this.props.droneStatus.time} label='Time' suffix='s'
                                      description='Motors on time'/>
                <SingleValueTelemetry value={this.props.droneStatus.tof} label='Time of Flight' suffix='s'/>

                <Temperature temperature={this.props.droneStatus.temperature}/>
            </div>
        );

    }
}