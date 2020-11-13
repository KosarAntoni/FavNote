import React from 'react';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  clearErrors as clearErrorsAction,
  handleNewItemBarVisibility as handleNewItemBarVisibilityAction,
} from 'actions';
import ErrorModal from 'components/molecules/ErrorModal/ErrorModal';
import { withRouter } from 'react-router-dom';
import Loader from 'components/atoms/Loader/Loader';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { routes } from 'routes';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';

const ErrorWrapper = styled.div`
  position: fixed;
  top: 0;
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
  right: 0;
  height: 95vh;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  z-index: 100;
`;

const UserPageTemplate = ({
  children,
  isLoading,
  errorInfo,
  clearErrors,
  history,
  isNewItemBarVisible,
  handleNewItemBarVisibility,
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
      <NewItemBar
        handleClose={handleNewItemBarVisibility}
        isVisible={isNewItemBarVisible}
      />
    </>
  );
};

UserPageTemplate.propTypes = {
  isLoading: PropTypes.bool,
  isNewItemBarVisible: PropTypes.bool,
  clearErrors: PropTypes.func,
  handleNewItemBarVisibility: PropTypes.func.isRequired,
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
  isNewItemBarVisible: false,
  errorInfo: null,
};

const mapStateToProps = ({ isLoading, errorInfo, isNewItemBarVisible }) => (
  { isLoading, errorInfo, isNewItemBarVisible });

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(clearErrorsAction()),
  handleNewItemBarVisibility: () => dispatch(handleNewItemBarVisibilityAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPageTemplate));
