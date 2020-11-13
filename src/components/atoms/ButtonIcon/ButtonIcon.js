import styled from 'styled-components';

const ButtonIcon = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  border: none;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: 50%;
  background-color: ${({ active, theme }) => (active ? theme.white : 'transparent')};
  color: ${({ theme }) => theme.black};

  margin: 0.3rem;
  
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s;
  
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      margin-top: 0;
      width: 6.5rem;
      height: 6.5rem;
    }
    
   ::after {
    content: attr(data-text);
    display: block;
    position: absolute;
    white-space: nowrap;
    left: 150%;
    
    font-size: ${({ theme }) => theme.fontSize.xs};
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.grey100};
    background-color: ${({ theme }) => theme.white};
    border-radius: 0.5rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.02), 0 1px 12px rgba(0, 0, 0, 0.12);
    
    opacity: 0;
    transition: all 0.3s;
    transform: translateX(-10%);
    visibility: hidden;
  }
    
  
  :hover {
    background-color: ${({ theme }) => theme.whiteHover};
  }

  :hover::after {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }
  
  :focus {
    outline: none;
  }
  
  &.active {
    background-color: ${({ theme }) => theme.white};
  }
`;

export default ButtonIcon;
