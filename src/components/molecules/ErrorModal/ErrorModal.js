import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import PropTypes from 'prop-types';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import CloseIcon from 'assets/times-solid.svg';

const StyledWrapper = styled(motion.div)`
  position: fixed;
  top: 2rem;
  padding: 1rem 3rem;
  
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => (theme.red)};
  border-radius: 1rem;

  background-color:#fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.02), 0 1px 12px rgba(0, 0, 0, 0.12);  
`;

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => (theme.red)};
  font-weight: ${({ theme }) => theme.regular};
`;

const StyledCloseButton = styled(ButtonIcon)`
  position: absolute;
  top: 0;
  right: 0;
  
  margin: 0;
  padding: 0;
  height: 3rem;
  width: 3rem;
  
  :focus {
    outline: none;
  }
  
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      height: 3rem;
      width: 3rem;
    }
`;

const ErrorModal = ({ children, onClickAction }) => (
  <StyledWrapper
    initial={{
      opacity: 0,
      y: -50,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: -50,
    }}
    transition={{
      duration: 0.3,
    }}
  >
    <StyledParagraph>
      {children}
    </StyledParagraph>
    {onClickAction && <StyledCloseButton icon={CloseIcon} onClick={onClickAction} />}
  </StyledWrapper>
);

ErrorModal.propTypes = {
  children: PropTypes.string.isRequired,
  onClickAction: PropTypes.func,
};

ErrorModal.defaultProps = {
  onClickAction: null,
};

export default ErrorModal;
