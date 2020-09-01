import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 1rem;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: 50%;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
  margin-bottom: 0.3rem;
  
  cursor: pointer;
  z-index: 2;
  
  &::after {
    content: '';
    display: block;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.01), inset 0px 4px 8px rgba(0, 0, 0, 0.02), inset 0px 1px 12px rgba(0, 0, 0, 0.12);
    z-index: -1;  

    opacity: 0;
    
    transition: all 0.3s;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  &.active {
    background-color: white;
  }
`;

export default ButtonIcon;
