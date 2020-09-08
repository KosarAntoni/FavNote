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

  width: 12rem;
  height: 4rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.black};
  text-transform: uppercase;
  
  transition: all 0.3s;
  cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12), 0 1px 8px rgba(0, 0, 0, 0.1);
  
  :hover {
    border-color: ${({ theme }) => (theme.white)} ;
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
