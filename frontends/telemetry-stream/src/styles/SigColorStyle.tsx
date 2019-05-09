import styled from 'styled-components';

interface SigColorProps {
    value: number;
}

export const SigColor = styled.span<SigColorProps>`
color: ${ p => p.value < 0 ? 'palevioletred' : 'lightblue'};
`;