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
import { register as registerAction } from 'actions';
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

const AuthPage = ({ register }) => (
  <AuthTemplate keyInfo="Register">
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      onSubmit={({ username, email, password }) => {
        register(username, email, password);
      }}
    >
      {({ handleChange, handleBlur, values }) => (
        <>
          <Heading>Register</Heading>
          <StyledForm>
            <StyledInput
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <StyledInput
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <StyledInput
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <Button activecolor="notes" type="submit">
              register
            </Button>
          </StyledForm>
          <StyledLink to={routes.login}>I want log in!</StyledLink>
        </>
      )}
    </Formik>
  </AuthTemplate>
);

AuthPage.propTypes = {
  register: PropTypes.func,
};

AuthPage.defaultProps = {
  register: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  register: (username, email, password) => dispatch(registerAction(username, email, password)),
});

export default connect(null, mapDispatchToProps)(AuthPage);
