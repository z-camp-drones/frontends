import React, {Component} from 'react';
import {Icon} from '@material-ui/core';
import styled from 'styled-components';

const TooltipStyle = styled.span`
position: relative;
display: inline-block;



.tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

&:hover .tooltiptext {
  visibility: visible;
}
`;

class Tooltip extends Component<{ text: string, tooltip?: string }> {
  render() {
    if (!this.props.tooltip) {
      return (
        <span>{this.props.text}</span>
      );
    }
    return (
      <TooltipStyle>
        {this.props.text}
        <Icon fontSize={'small'} color={'primary'}>info</Icon>

        <span className="tooltiptext">{this.props.tooltip}</span>
      </TooltipStyle>
    );
  }
}

export default Tooltip;