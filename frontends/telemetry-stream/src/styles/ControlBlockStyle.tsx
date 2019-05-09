import styled from 'styled-components';

interface ControlBlockStyleProps {

}

export const ControlBlockStyle = styled.div<ControlBlockStyleProps>`
width: 200px;
border-radius: 5px;
margin-top: 5px;
margin-left: 5px;
background: #06000078;

h1 {
  font-size: 14px;
  padding: 5px;
  border-bottom: 1px solid #f5f5f5;
}

> {
  font-size: 12px;
  color: whitesmoke;
}
`;