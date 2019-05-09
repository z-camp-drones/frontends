import React from 'react';
import {TemperatureDto} from './telemetry/TelemetryDto';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';


const fahrenheitToCelsius = function (temperature: number) {
  return (temperature - 32) / 1.80;
};

export const TemperatureEntry = styled.div`
display: flex;
justify-content: space-between;
`;

export const Temperature = function ({temperature}: { temperature: TemperatureDto }) {
  return (
  <TemperatureEntry>
    <label>Temperature</label>
    <span>
      <NumberFormat value={fahrenheitToCelsius(temperature.low)} displayType={'text'}
                    decimalScale={2}
                    suffix='°C'/>
      &nbsp;-&nbsp;
      <NumberFormat value={fahrenheitToCelsius(temperature.high)} displayType={'text'}
                    decimalScale={2}
                    suffix='°C'/>
                    </span>
  </TemperatureEntry>);
};