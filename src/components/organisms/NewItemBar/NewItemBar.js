import React from 'react';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import withContext from 'hoc/withContext';
import PropTypes from 'prop-types';
import Button from 'components/atoms/Button/Button';
import { connect } from 'react-redux';
import { addItem as addItemAction } from 'actions';
import {
  Formik, Form,
} from 'formik';

const StyledWrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.02), 0 1px 12px rgba(0, 0, 0, 0.12);
  background-color: ${({ theme }) => theme.white};
  
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '110%')});
  transition: transform 0.3s;
  
      @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
        right: 0;
        top: 0;
        width: 50rem;
        height: 100%;
        border-radius: 0;
        transform: translateX(${({ isVisible }) => (isVisible ? '0' : '110%')});
    }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`;

const StyledTextArea = styled(Input)`
  height: 30vh;
  margin-bottom: 2rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      max-width: 30rem
    }
`;

const StyledButton = styled(Button)`
  width: 48%;
  text-decoration: none;
`;

const NewItemBar = ({
  pageContext, isVisible, addItem, handleClose,
}) => {
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Required';
    }
    if (!values.content) {
      errors.content = 'Required';
    }
    if (pageContext === 'twitters' && !values.twitterName) {
      errors.twitterName = 'Required';
    }
    if (pageContext === 'articles' && !values.articleUrl) {
      errors.articleUrl = 'Required';
    }
    return errors;
  };

  return (
    <StyledWrapper isVisible={isVisible}>
      <Heading big>Create new</Heading>
      <Formik
        initialValues={{
          title: '', content: '', articleUrl: '', twitterName: '', created: '',
        }}
        validate={(values) => validate(values)}
        onSubmit={(values, { resetForm }) => {
          addItem(pageContext, values);
          resetForm();
          handleClose();
        }}
      >
        {({
          values, handleChange, handleBlur, errors,
        }) => (
          <StyledForm>
            <StyledInput
              type="text"
              name="title"
              placeholder={(errors.title && 'title is required') || 'title'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              activecolor={pageContext}
              error={errors.title}
            />
            {pageContext === 'twitters' && (
              <StyledInput
                placeholder={(errors.twitterName && 'twitter name is required') || 'twitter name eg. hello_roman'}
                type="text"
                name="twitterName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.twitterName}
                activecolor={pageContext}
                error={errors.twitterName}
              />
            )}
            {pageContext === 'articles' && (
              <StyledInput
                placeholder={(errors.articleUrl && 'link is required') || 'link'}
                type="text"
                name="articleUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.articleUrl}
                activecolor={pageContext}
                error={errors.articleUrl}
              />
            )}
            <StyledTextArea
              name="content"
              placeholder={(errors.content && 'text is required') || 'text'}
              as="textarea"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
              activecolor={pageContext}
              error={errors.content}
            />
            <ButtonsWrapper>
              <StyledButton type="submit" activecolor={pageContext}>
                Add Note
              </StyledButton>
              <StyledButton type="reset" activecolor={pageContext} onClick={handleClose}>
                close
              </StyledButton>
            </ButtonsWrapper>
          </StyledForm>
        )}
      </Formik>

    </StyledWrapper>
  );
};

NewItemBar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  isVisible: PropTypes.bool,
  addItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
};

NewItemBar.defaultProps = {
  pageContext: 'notes',
  isVisible: false,
  handleClose: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (itemType, itemContent) => dispatch(addItemAction(itemType, itemContent)),
});

export default connect(null, mapDispatchToProps)(withContext(NewItemBar));
