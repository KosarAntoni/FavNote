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
import Moment from 'react-moment';

const StyledWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 19;

  overflow: scroll;
  padding-bottom: 7rem;

    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      left: 10rem;
    }
`;

const StyledBackground = styled(motion.div)`
  padding: 1.5rem 3rem;
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => (theme.white)};


  border-width: 2px;
  border-style: solid;
  border-color: ${({ activecolor, theme }) => (activecolor ? theme[activecolor] : theme.white)};
  border-radius: 1rem;

  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.02), 0 1px 12px rgba(0, 0, 0, 0.12);

  @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
    display: ${({ activecolor }) => (activecolor === 'twitters' ? 'grid' : 'flex')};
    grid-template-columns: auto 20rem;
    grid-template-rows: auto 1fr auto auto;
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
  margin: 0;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: auto;
`;

const StyledLink = styled.a`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 2rem 0 1rem;
`;

const DateInfo = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin: 0 0 1rem;
`;

const StyledImage = styled.img`
    border-radius: 50%;
    margin: 0 0 0 auto;
    width: 15rem;
    height: 15rem;
    border: 1px solid ${({ theme }) => theme.grey300};


    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      grid-area: 1 / 2 / 4 / 2;
      width: 12rem;
      height: 12rem;
    }
`;

const ButtonsWrapper = styled.div`
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
  id, pageContext, title, content, articleUrl, twitterName, removeItem, dateInfo,
}) => (
  <UserPageTemplate>
    <StyledWrapper
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 1,
      }}
      transition={{
        duration: 0,
      }}
    >
      {!title ? <StyledLoader />
        : (
          <StyledBackground
            animate={{
              opacity: [0, 1],
              y: [20, -5, 0],
            }}
            exit={{
              opacity: 0,
              y: 10,
              transition: { duration: 0.15 },
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
            </StyledPageHeader>
            <StyledParagraph>{content}</StyledParagraph>
            {pageContext === 'articles' && <StyledLink href={articleUrl}>Open article</StyledLink>}
            <DateInfo>
              {'Posted: '}
              <Moment format="DD-MMMM-YYYY">
                {dateInfo}
              </Moment>
            </DateInfo>
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
          </StyledBackground>
        )}
    </StyledWrapper>
  </UserPageTemplate>
);

DetailsTemplate.propTypes = {
  pageContext: PropTypes.string.isRequired,
  title: PropTypes.string,
  dateInfo: PropTypes.string,
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
  dateInfo: '',
  content: '',
  articleUrl: '',
  twitterName: '',
  id: '',
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(withContext(DetailsTemplate));
