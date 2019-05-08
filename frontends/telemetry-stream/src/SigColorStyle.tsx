import styled from 'styled-components';

interface SigColorProps {
    value: number;
}

export const SigColor = styled.span<SigColorProps>`
border: thin solid red;
margin: 10px;
color: ${ p => p.value < 0 ? 'red' : 'blue'};
`;