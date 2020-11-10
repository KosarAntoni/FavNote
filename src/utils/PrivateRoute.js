import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { routes } from '../routes';

const PrivateRoute = ({
  userJWT, path, component, exact,
}) => (
  <>
    {userJWT ? (
      <Route
        exact={exact}
        path={path}
        component={component}
      />
    ) : <Redirect to={routes.login} />}
  </>
);

PrivateRoute.propTypes = {
  userJWT: PropTypes.string,
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  exact: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  userJWT: null,
  exact: false,
};

const mapStateToProps = ({ userJWT }) => ({ userJWT });

export default connect(mapStateToProps)(PrivateRoute);
