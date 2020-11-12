import React from 'react';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  clearErrors as clearErrorsAction,
} from 'actions';
import ErrorModal from 'components/molecules/ErrorModal/ErrorModal';
import { withRouter } from 'react-router-dom';
import Loader from 'components/atoms/Loader/Loader';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { routes } from '../routes';

const ErrorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  left: 0;
  right: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  z-index: 100;
`;

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  left: 0;
  right: 0;
  height: 95vh;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  z-index: 100;
`;

const UserPageTemplate = ({
  children, isLoading, errorInfo, clearErrors, history,
}) => {
  const handleErrorClose = (status) => {
    clearErrors();
    if (status === 404) history.push(routes.home);
  };

  return (
    <>
      <AnimatePresence>
        { errorInfo
        && (
          <ErrorWrapper>
            <ErrorModal
              onClickAction={() => handleErrorClose(errorInfo.status)}
            >
              {errorInfo.statusText}
            </ErrorModal>
          </ErrorWrapper>
        )}
      </AnimatePresence>
      <Sidebar />
      {isLoading && (
      <StyledWrapper>
        <Loader />
      </StyledWrapper>
      )}
      {children}
    </>
  );
};

UserPageTemplate.propTypes = {
  isLoading: PropTypes.bool,
  clearErrors: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  errorInfo: PropTypes.shape({
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    statusText: PropTypes.string,
  }),
};

UserPageTemplate.defaultProps = {
  clearErrors: () => {},
  isLoading: false,
  errorInfo: null,
};

const mapStateToProps = ({ isLoading, errorInfo }) => (
  { isLoading, errorInfo });

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(clearErrorsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPageTemplate));
