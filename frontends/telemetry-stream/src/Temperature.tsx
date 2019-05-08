import React from 'react';
import {TemperatureDto} from './telemetry/TelemetryDto';
import NumberFormat from 'react-number-format';

export const Temperature = function ({temperature}: { temperature: TemperatureDto }) {
    return (<div>
        <label>Temperature</label>
        <span>
                        <NumberFormat value={temperature.low} displayType={'text'}
                                      decimalScale={2}
                                      suffix='°C'/>
                        -
                        <NumberFormat value={temperature.high} displayType={'text'}
                                      decimalScale={2}
                                      suffix='°C'/>
                    </span>
    </div>);
};