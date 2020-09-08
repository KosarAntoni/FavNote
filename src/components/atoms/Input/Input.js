import styled, { css } from 'styled-components';
import magnifierIcon from 'assets/magnifier.svg';

const Input = styled.input`
  padding: 1.5rem 3rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  border: 1px solid ${({ theme }) => theme.grey200};
  border-radius: 1rem;
  transition: all 0.3s;

  ::placeholder {
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: ${({ theme }) => theme.regular};
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey300};
  }
  
  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px ${({ theme, activecolor }) => (activecolor ? theme[activecolor] : theme.notes)} ;
  }
  
  ${({ search }) => (
    search && css`
      padding: 1rem 2rem 1rem 4rem;
      font-size: ${({ theme }) => theme.fontSize.xs};
      background-image: url(${magnifierIcon});
      background-size: 1.5rem;
      background-position: 1.5rem 50% ;
      background-repeat: no-repeat ;
    `
  )
}
`;

export default Input;
