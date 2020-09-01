import styled, { css } from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.notes} ;
  background-color: ${({ theme }) => theme.notes} ;

  width: 12rem;
  height: 4rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.black};
  text-transform: uppercase;
  
  cursor: pointer;
  
  ${({ secondary }) => (
    secondary && css`
      border-color: ${({ theme }) => theme.grey300};
      background: transparent;
    `
  )};
`;

export default Button;
