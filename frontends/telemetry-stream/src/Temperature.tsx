import React, {Component} from 'react';
import {TemperatureDto} from './telemetry/TelemetryDto';
import NumberFormat from 'react-number-format';

export class Temperature extends Component<{ temperature: TemperatureDto }> {
    render() {
        return <div>
            <label>Temperature</label>
            <span>
                        <NumberFormat value={this.props.temperature.low} displayType={'text'}
                                      decimalScale={2}
                                      suffix='°C'/>
                        -
                        <NumberFormat value={this.props.temperature.high} displayType={'text'}
                                      decimalScale={2}
                                      suffix='°C'/>
                    </span>
        </div>;
    }
}