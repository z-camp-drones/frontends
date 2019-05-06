import React, {Component} from 'react';
import './Tooltip.css';
import {Icon} from '@material-ui/core';

class Tooltip extends Component<{ text: string, tooltip?: string }> {
    render() {
        if (!this.props.tooltip) {
            return (
                <span>{this.props.text}</span>
            );
        }
        return (
            <span className="tooltip">
                {this.props.text}
                <Icon fontSize={'small'} color={'primary'}>info</Icon>

                <span className="tooltiptext">{this.props.tooltip}</span>
            </span>
        );
    }
}

export default Tooltip;