import React from 'react';
import './SingleValueTelemetry.css';
import Tooltip from './Tooltip';
import NumberFormat from 'react-number-format';
import {SigColor} from './SigColorStyle';

interface IProps {
    label: string;
    value: number;
    description?: string;
    suffix?: string;
}

const SingleValueTelemetry = ({label, value, description, suffix}: IProps) => (
    <div>
        <label>
            <Tooltip text={label} tooltip={description}/>
        </label>
        <SigColor value={value}>
            <NumberFormat value={value} displayType={'text'} decimalScale={2} suffix={suffix}/>
        </SigColor>
    </div>
);
export default SingleValueTelemetry;