import React from 'react';
import './Telemetry.css';

import 'typeface-roboto';
import 'material-icons/iconfont/material-icons.css';
import SingleValueTelemetry from './SingleValueTelemetry';
import {Temperature} from './Temperature';
import TelemetryDto from './telemetry/TelemetryDto';
import styled from 'styled-components';
import Coordinate from './Coordinate';

interface IProps {
    droneStatus: TelemetryDto | null;
}

const NoDroneData = styled.div`
color: red;
`;

const Telemetry = ({droneStatus}: IProps) => {
    if (!droneStatus) {
        return (<NoDroneData>No Drone Status available yet.</NoDroneData>);
    }
    return (<div>
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

    </div>)
};
export default Telemetry;
