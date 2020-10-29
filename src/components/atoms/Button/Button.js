import styled, { css } from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, activecolor }) => (activecolor ? theme[activecolor] : theme.notes)} ;
  background-color: ${({ theme, activecolor }) => (activecolor ? theme[activecolor] : theme.notes)} ;

  width: 14rem;
  height: 4rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.black};
  text-transform: uppercase;
  
  transition: all 0.3s;
  cursor: pointer;
  
  :hover {
    background-color: ${({ theme }) => (theme.white)} ;
  }
  
  
  ${({ secondary }) => (
    secondary && css`
      border-color: ${({ theme }) => theme.grey200};
      background: transparent;
      box-shadow: none;
      
      &:hover {
          background-color: ${({ theme }) => theme.greyHover};
          box-shadow: none;
      }
    `
  )};
`;

export default Button;
