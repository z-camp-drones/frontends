import React from 'react';
import Tooltip from './Tooltip';
import NumberFormat from 'react-number-format';
import {SigColor} from './styles/SigColorStyle';
import styled from 'styled-components';
import {TelemetryLabel} from './TelemetryLabel';

interface IProps {
  label: string;
  value: number;
  description?: string;
  suffix?: string;
  max?: number
}

interface BackgroundColorProps {
  value: number;
  max: number;
}


export const BackgroundColor = styled.div<BackgroundColorProps>`
position: relative;
&:before{
  content:'';
  position:absolute;
  background-color: ${p => p.value < 0 ? 'red' : 'green'};
  ${p => p.value < 0 ? 'right: 50%;' : 'left: 50%;'}
  height: 5px;
  bottom: 0;
  opacity: 0.5;
  width: ${p => 100 * 0.5 * Math.abs(p.value) / (p.max)}%;
}
`;
const FlightStat = ({label, value, description, suffix, max = 90}: IProps) => (
  <BackgroundColor max={max} value={value}>
    <TelemetryLabel>
      <Tooltip text={label} tooltip={description}/>
    </TelemetryLabel>
    <SigColor value={value}>
      <NumberFormat value={value} displayType={'text'} decimalScale={2} suffix={suffix}/>
    </SigColor>
  </BackgroundColor>
);
export default FlightStat;