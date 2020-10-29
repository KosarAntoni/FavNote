import React, { Component } from 'react';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import { Form, Formik } from 'formik';
import Input from 'components/atoms/Input/Input';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import { routes } from 'routes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticate as authenticateAction } from 'actions';

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

const StyledAuthCard = styled.div`
  width: 90%;
  max-width: 40rem;
  height: 40rem;
  
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeading = styled(Heading)`
  width: 30rem;
  text-align: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
`;

const StyledInput = styled(Input)`
  margin: 0 0 3rem 0;
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

class AuthTemplate extends Component {
  state = {
    pageType: 'login',
  }

  componentDidMount() {
    this.setCurrentPage();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setCurrentPage(prevState);
  }

  setCurrentPage = (prevState = '') => {
    const pageTypes = ['login', 'register'];
    const { location: { pathname } } = this.props;
    const [currentPage] = pageTypes.filter((page) => pathname.includes(page));

    if (prevState.pageType !== currentPage) {
      this.setState({ pageType: currentPage });
    }
  }

  render() {
    const { pageType } = this.state;
    const { authenticate, userID } = this.props;
    if (userID) { return (<Redirect to={routes.home} />); }

    return (
      <StyledWrapper>
        <StyledHeading>Your new favorite online notes experience</StyledHeading>
        <StyledAuthCard>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={({ username, password }) => {
              authenticate(username, password);
            }}
          >
            {({ handleChange, handleBlur, values }) => (
              <>
                {pageType === 'login' && <Heading>Sign in</Heading>}
                {pageType === 'register' && <Heading>Register</Heading>}
                <StyledForm>
                  <StyledInput
                    type="text"
                    name="username"
                    placeholder="Login"
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
                  {pageType === 'login' && (
                  <Button activecolor="notes" type="submit">
                    sign in
                  </Button>
                  )}
                  {pageType === 'register' && (
                  <Button activecolor="notes" type="submit">
                    register
                  </Button>
                  )}
                </StyledForm>
                {pageType === 'login' && <StyledLink to={routes.register}>I want create account!</StyledLink>}
                {pageType === 'register' && <StyledLink to={routes.login}>I want log in!</StyledLink>}
              </>
            )}
          </Formik>
        </StyledAuthCard>
      </StyledWrapper>
    );
  }
}

const mapStateToProps = ({ userID = null }) => ({
  userID,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
});

AuthTemplate.propTypes = {
  authenticate: PropTypes.func.isRequired,
  userID: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

AuthTemplate.defaultProps = {
  userID: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthTemplate));
