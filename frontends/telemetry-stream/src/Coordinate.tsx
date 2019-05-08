import React from 'react';
import {CoordinateDto} from './telemetry/TelemetryDto';
import NumberFormat from 'react-number-format';
import './Coordinate.css';
import {SigColor} from './SigColorStyle';

const Coordinate = ({coordinate, label}: { coordinate: CoordinateDto, label: string }) => (
    <div>
        <label>
            {label}
        </label>
        <span className='coordinate'>
            <SigColor value={coordinate.x}>
                <NumberFormat value={coordinate.x} displayType={'text'} decimalScale={2}/>
            </SigColor>
            <SigColor value={coordinate.y}>
                <NumberFormat value={coordinate.y} displayType={'text'} decimalScale={2}/>
            </SigColor>
            <SigColor value={coordinate.z}>
                <NumberFormat value={coordinate.z} displayType={'text'} decimalScale={2}/>
            </SigColor>
        </span>
    </div>

);
export default Coordinate;