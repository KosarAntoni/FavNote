import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  border: none;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: 50%;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
  margin: 0.3rem;
  
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s;
  
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      margin-top: 0;
      width: 6.5rem;
      height: 6.5rem;
    }
  
  &:hover {
    background-color: ${({ theme }) => theme.whiteHover};
  }
  
  &.active {
    background-color: ${({ theme }) => theme.white};
  }
`;

export default ButtonIcon;
