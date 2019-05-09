import React from 'react';
import './SingleValueTelemetry.css';
import TelemetryDto from './telemetry/TelemetryDto';
import Coordinate from './Coordinate';
import SingleValueTelemetry from './SingleValueTelemetry';
import {Temperature} from './Temperature';

interface IProps {
  droneData: TelemetryDto;
}

const TelemetryData = ({droneData}: IProps) => (
  <div>
    <Coordinate coordinate={droneData.acceleration} label='Acceleration'/>
    <Coordinate coordinate={droneData.speed} label='Speed'/>

    <SingleValueTelemetry value={droneData.barometer} label='Barometer' suffix='hPa'/>
    <SingleValueTelemetry value={droneData.battery} label='Battery' suffix='%'/>
    <SingleValueTelemetry value={droneData.heigh} label='Height' suffix='cm'/>

    <SingleValueTelemetry value={droneData.pitch} label='Pitch' suffix='°'/>
    <SingleValueTelemetry value={droneData.roll} label='Roll' suffix='°C'/>
    <SingleValueTelemetry value={droneData.yaw} label='Yaw' suffix='°C'/>

    <SingleValueTelemetry value={droneData.time} label='Time' suffix='s' description='Motors on time'/>
    <SingleValueTelemetry value={droneData.tof} label='Time of Flight' suffix='s'/>

    <Temperature temperature={droneData.temperature}/>
  </div>

);
export default TelemetryData;