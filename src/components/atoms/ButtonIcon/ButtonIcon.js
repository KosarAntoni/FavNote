import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 1rem;
  border: none;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: 50%;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
  margin-bottom: 0.3rem;
  
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${({ theme }) => theme.whiteHover};
  }
  
  &.active {
    background-color: ${({ theme }) => theme.white};
  }
`;

export default ButtonIcon;
