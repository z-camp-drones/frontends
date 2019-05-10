import styled from 'styled-components';

interface BatteryControlBlockStyleProps {

}

export const BatteryControlBlockStyle = styled.div<BatteryControlBlockStyleProps>`
width: 200px;
padding: 5px;
border-radius: 5px;
margin-top: 5px;
margin-left: 5px;
background: #06000078;
color: whitesmoke;
font-size: 12px;

div {
    display: flex;
    justify-content: space-between;
}

div > span {
    margin-right: 10px;
}
`;