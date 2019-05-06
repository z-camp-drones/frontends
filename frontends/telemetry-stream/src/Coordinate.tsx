import React, {Component} from 'react';
import {CoordinateDto} from './telemetry/TelemetryDto';
import NumberFormat from 'react-number-format';
import './Coordinate.css';

export class Coordinate extends Component<{ coordinate: CoordinateDto, label: string }> {
    render() {
        return (
            <div>
                <label>
                    Acceleration:
                </label>
                <span className='coordinate'>
                    <NumberFormat value={this.props.coordinate.x} displayType={'text'} decimalScale={2}
                                  renderText={value => <span className="single-value" id="acc-x">{value}</span>}/>
                    <NumberFormat value={this.props.coordinate.y} displayType={'text'} decimalScale={2}
                                  renderText={value => <span className="single-value" id="acc-y">{value}</span>}/>
                    <NumberFormat value={this.props.coordinate.z} displayType={'text'} decimalScale={2}
                                  renderText={value => <span className="single-value" id="acc-z">{value}</span>}/>
                </span>
            </div>

        );
    }
}