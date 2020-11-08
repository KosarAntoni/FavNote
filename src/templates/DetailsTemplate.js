import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserPageTemplate from 'templates/UserPageTemplate';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import { removeItem as removeItemAction } from 'actions';
import Loader from 'components/atoms/Loader/Loader';
import { motion } from 'framer-motion';

const StyledWrapper = styled(motion.div)`
  padding: 1.5rem 3rem;
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;

  border-width: 2px;
  border-style: solid;
  border-color: ${({ activecolor, theme }) => (activecolor ? theme[activecolor] : theme.white)};

  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.02), 0 1px 12px rgba(0, 0, 0, 0.12);
  border-radius: 1rem;

  @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
    display: ${({ activecolor }) => (activecolor === 'twitters' ? 'grid' : 'flex')};
    grid-template-columns: auto 20rem;
    grid-template-rows: auto 1fr auto;
    margin-left: 3rem;
    padding: 1.5rem 3rem;
    min-height: 30rem;
  }
`;

const StyledPageHeader = styled.div`
  margin: 1rem 0;
  text-align: center;
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
        text-align: left;
    }
`;

const StyledHeading = styled(Heading)`
  margin: 2rem 0 0 0;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledLink = styled.a`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 2rem 0 5rem;
`;

const StyledImage = styled.img`
    border-radius: 50%;
    margin: 0 auto;
    width: 15rem;
    height: 15rem;

    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      grid-area: 1 / 2 / 3 / 2;
      width: 12rem;
      height: 12rem;
    }
`;

const ButtonsWrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      max-width: 40rem
    }
`;

const StyledButton = styled(Button)`
  width: 48%;
  text-decoration: none;
`;

const StyledLoader = styled(Loader)`
  margin: 40% auto;
`;

const DetailsTemplate = ({
  id, pageContext, title, created, content, articleUrl, twitterName, removeItem,
}) => (
  <UserPageTemplate keyInfo="DetailsTemplate">
    {!title ? <StyledLoader />
      : (
        <StyledWrapper
          animate={{
            opacity: [0, 1],
            y: [10, -5, 0],
          }}
          transition={{
            duration: 0.3,
          }}
          activecolor={pageContext}
        >
          {pageContext === 'twitters' && (
          <StyledImage alt={title} src={`https://unavatar.now.sh/twitter/${twitterName}`} />
          )}
          <StyledPageHeader>
            <StyledHeading big as="h1">
              {title}
            </StyledHeading>
            <StyledParagraph>{created}</StyledParagraph>
          </StyledPageHeader>
          <Paragraph>{content}</Paragraph>
          {pageContext === 'articles' && <StyledLink href={articleUrl}>Open article</StyledLink>}
          <ButtonsWrapper>
            <StyledButton
              as={Link}
              to={`/${pageContext}`}
              activecolor={pageContext}
            >
              close
            </StyledButton>
            <StyledButton
              as={Link}
              to={`/${pageContext}`}
              onClick={() => removeItem(pageContext, id)}
              activecolor={pageContext}
            >
              Remove
            </StyledButton>
          </ButtonsWrapper>
        </StyledWrapper>
      )}

  </UserPageTemplate>
);

DetailsTemplate.propTypes = {
  pageContext: PropTypes.string.isRequired,
  title: PropTypes.string,
  created: PropTypes.string,
  content: PropTypes.string,
  articleUrl: PropTypes.string,
  twitterName: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  removeItem: PropTypes.func.isRequired,
};

DetailsTemplate.defaultProps = {
  title: '',
  created: '',
  content: '',
  articleUrl: '',
  twitterName: '',
  id: '',
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(withContext(DetailsTemplate));
