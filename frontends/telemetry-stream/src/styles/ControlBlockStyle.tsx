import styled from 'styled-components';

interface ControlBlockStyleProps {

}

export const ControlBlockStyle = styled.div<ControlBlockStyleProps>`
width: 200px;
height: 100%;
border-radius: 5px;
margin-top: 5px;
margin-left: 5px;
background: #06000078;
color: whitesmoke;
font-size: 12px;

.telemetry-title {
  font-size: 14px;
  padding: 5px;
  color: #f5f5f5; 
  border-bottom: 1px solid #f5f5f5;
}

.telemetry-data {
  margin: 5px;
  opacity: 0.9;
}
`;