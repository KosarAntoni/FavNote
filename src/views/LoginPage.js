import React from 'react';
import AuthTemplate from 'templates/AuthTemplate';
import { Form, Formik } from 'formik';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import Input from 'components/atoms/Input/Input';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { connect } from 'react-redux';
import { authenticate as authenticateAction } from 'actions';
import PropTypes from 'prop-types';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
`;

const StyledInput = styled(Input)`
  margin: 0 0 2rem 0;
  height: 4rem;
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'username is required';
  } else if (values.username.length > 40) {
    errors.username = 'must be 40 characters or less';
  }

  if (!values.password) {
    errors.password = 'password is required';
  }

  return errors;
};

const AuthPage = ({ authenticate }) => (
  <AuthTemplate>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={({ username, password }) => {
        authenticate(username, password);
      }}
      validate={(values) => validate(values)}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
      }) => (
        <>
          <Heading>Sign in</Heading>
          <StyledForm>
            <StyledInput
              type="text"
              name="username"
              placeholder={(errors.username) || 'username'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              error={(errors.username)}
            />
            <StyledInput
              type="password"
              name="password"
              placeholder={(errors.password) || 'password'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              error={(errors.password)}
            />
            <Button activecolor="notes" type="submit">
              sign in
            </Button>
          </StyledForm>
          <StyledLink to={routes.register}>I want register!</StyledLink>
        </>
      )}
    </Formik>
  </AuthTemplate>
);

AuthPage.propTypes = {
  authenticate: PropTypes.func,
};

AuthPage.defaultProps = {
  authenticate: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
});

export default connect(null, mapDispatchToProps)(AuthPage);
