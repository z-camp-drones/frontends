import React, {Component} from 'react';
import Tooltip from './Tooltip';
import NumberFormat from 'react-number-format';

export default class SingleValueTelemetry extends Component<{ value: number, label: string, suffix?: string, description?: string }> {
    render() {
        return (
            <div>
                <label>
                    <Tooltip text={this.props.label} tooltip={this.props.description}/>
                </label>
                <span>
                <NumberFormat value={this.props.value} displayType={'text'} decimalScale={2}
                              suffix={this.props.suffix}/>
            </span>
            </div>
        );
    }
}