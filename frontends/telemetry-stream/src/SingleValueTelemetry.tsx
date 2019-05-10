import React from 'react';
import './SingleValueTelemetry.css';
import Tooltip from './Tooltip';
import NumberFormat from 'react-number-format';
import {SigColor} from './styles/SigColorStyle';
import {TelemetryLabel} from './TelemetryLabel';

interface IProps {
  label: string;
  value: number;
  description?: string;
  suffix?: string;
}

const SingleValueTelemetry = ({label, value, description, suffix}: IProps) => (
  <div className="single-value-telemetry">
    <TelemetryLabel>
      <Tooltip text={label} tooltip={description}/>
    </TelemetryLabel>
    <SigColor value={value}>
      <NumberFormat value={value} displayType={'text'} decimalScale={2} suffix={suffix} className="value"/>
    </SigColor>
  </div>
);
export default SingleValueTelemetry;