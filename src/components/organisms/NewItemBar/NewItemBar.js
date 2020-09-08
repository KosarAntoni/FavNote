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
  top: 0;
  width: 50rem;
  height: 100%;
  z-index: 100;
  
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.02), 0 1px 12px rgba(0, 0, 0, 0.12);
  background-color: ${({ theme }) => theme.white};
  
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '110%')});
  transition: transform 0.3s;
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

const NewItemBar = ({
  pageContext, isVisible, addItem, handleClose,
}) => (
  <StyledWrapper isVisible={isVisible}>
    <Heading big>Create new</Heading>
    <Formik
      initialValues={{
        title: '', content: '', articleUrl: '', twitterName: '', created: '',
      }}
      onSubmit={(values) => {
        addItem(pageContext, values);
        handleClose();
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <StyledForm>
          <StyledInput
            type="text"
            name="title"
            placeholder="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          {pageContext === 'twitters' && (
            <StyledInput
              placeholder="twitter name eg. hello_roman"
              type="text"
              name="twitterName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.twitterName}
            />
          )}
          {pageContext === 'articles' && (
            <StyledInput
              placeholder="link"
              type="text"
              name="articleUrl"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.articleUrl}
            />
          )}
          <StyledTextArea
            name="content"
            as="textarea"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.content}
          />
          <Button type="submit" activecolor={pageContext}>
            Add Note
          </Button>
        </StyledForm>
      )}
    </Formik>

  </StyledWrapper>
);

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
