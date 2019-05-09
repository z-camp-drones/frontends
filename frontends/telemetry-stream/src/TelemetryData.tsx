import React from 'react';
import TelemetryDto from './telemetry/TelemetryDto';
import Coordinate from './Coordinate';
import SingleValueTelemetry from './SingleValueTelemetry';
import {Temperature} from './Temperature';
import FlightStat from './FlightStat';

interface IProps {
  droneData: TelemetryDto;
}

const TelemetryData = ({droneData}: IProps) => (
  <div className="telemetry-data">
    <Coordinate coordinate={droneData.acceleration} label='Acceleration'/>
    <Coordinate coordinate={droneData.speed} label='Speed'/>

    <SingleValueTelemetry value={droneData.barometer} label='Barometer' suffix='hPa'/>
    <SingleValueTelemetry value={droneData.battery} label='Battery' suffix='%'/>
    <SingleValueTelemetry value={droneData.heigh} label='Height' suffix='cm'/>

    <FlightStat value={droneData.pitch} label='Pitch' suffix='°'/>
    <FlightStat value={droneData.roll} label='Roll' suffix='°' max={180}/>
    <FlightStat value={droneData.yaw} label='Yaw' suffix='°' max={180}/>

    <SingleValueTelemetry value={droneData.time} label='Time' suffix='s'/>
    <SingleValueTelemetry value={droneData.tof} label='Time of Flight' suffix='s'/>

    <Temperature temperature={droneData.temperature}/>
  </div>

);
export default TelemetryData;