import React from 'react';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';
import PropTypes from 'prop-types';
import Loader from 'components/atoms/Loader/Loader';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.notes};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledAuthCard = styled(motion.div)`
  width: 90%;
  max-width: 40rem;
  height: 40rem;
  
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.01), 0 4px 8px rgba(0,0,0,0.02), 0 1px 12px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeading = styled(Heading)`
  width: 30rem;
  text-align: center;
`;

const AuthTemplate = ({
  userID, isLoading, children, keyInfo,
}) => {
  if (userID) { return (<Redirect to={routes.home} />); }

  return (
    <StyledWrapper>
      <StyledHeading>Your new favorite online notes experience</StyledHeading>
      <AnimatePresence exitBeforeEnter>
        <StyledAuthCard
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          key={keyInfo}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 10,
            transition: { duration: 0.15 },
          }}
          transition={{
            duration: 0.3,
          }}
        >
          {isLoading ? <Loader />
            : (children)}
        </StyledAuthCard>
      </AnimatePresence>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ userID = null, isLoading }) => ({ userID, isLoading });

AuthTemplate.propTypes = {
  keyInfo: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  isLoading: PropTypes.bool,
  userID: PropTypes.string,
};

AuthTemplate.defaultProps = {
  keyInfo: 'noKey',
  isLoading: false,
  userID: null,
};

export default connect(mapStateToProps)(AuthTemplate);
