import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import LinkIcon from 'assets/link.svg';
import { connect } from 'react-redux';
import { removeItem as removeItemAction } from 'actions';
import withContext from 'hoc/withContext';
import { motion } from 'framer-motion';
import Moment from 'react-moment';

const StyledWrapper = styled(motion.div)`
  padding: 1.5rem 3rem;

  border-width: 2px;
  border-style: solid;
  border-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : theme.white)};
  border-radius: 1rem;

  background-color:#fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.02), 0 1px 12px rgba(0, 0, 0, 0.12);  
  overflow: hidden;
  margin: 0 1rem 2rem;
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledHeading = styled(Heading)`
  word-break: break-all;
  margin: 0 1rem 0 0;
  line-height: 3.6rem;
`;

const DateInfo = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin: 0 0 1rem;
`;

const StyledAvatar = styled.img`
  width: ${({ theme }) => theme.fontSize.xl};
  height: ${({ theme }) => theme.fontSize.xl};
  border: 1px solid ${({ theme }) => theme.grey300};
  border-radius: 50%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLinkButton = styled.a`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => (theme.grey300)};
  border-radius: 50%;

  display: block;
  flex-shrink: 0;
  width: ${({ theme }) => theme.fontSize.xl};
  height: ${({ theme }) => theme.fontSize.xl};
  background: ${({ theme }) => theme.white} url(${LinkIcon}) no-repeat;
  background-size: 60%;
  background-position: 50%;
`;

const StyledButton = styled(Button)`
  width: 48%;
`;

class Card extends Component {
  state = {
    redirect: false,
  }

  handleOpenClick = () => this.setState({ redirect: true });

  render() {
    const {
      animationDelay,
      pageContext,
      title,
      dateInfo,
      content,
      twitterName,
      articleUrl,
      id,
      removeItem,
    } = this.props;

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`${pageContext}/${id}`} />;
    }
    return (
      <StyledWrapper
        activeColor={pageContext}
        animate={{
          opacity: [0, 1],
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.3,
          delay: animationDelay,
        }}
      >
        <HeadingWrapper>
          <StyledHeading>{title}</StyledHeading>
          {pageContext === 'twitters'
          && <StyledAvatar src={`https://unavatar.now.sh/twitter/${twitterName}`} />}
          {pageContext === 'articles' && <StyledLinkButton href={articleUrl} />}
        </HeadingWrapper>
        <InnerWrapper flex>
          <Paragraph>
            {content.slice(0, 150)}
            {content.length >= 150 && '...'}
          </Paragraph>
          <DateInfo as={Moment} format="DD-MMMM-YYYY">{dateInfo}</DateInfo>
          <ButtonsWrapper>
            <StyledButton
              onClick={this.handleOpenClick}
              secondary
            >
              Open
            </StyledButton>
            <StyledButton
              onClick={() => removeItem(pageContext, id)}
              secondary
            >
              Remove
            </StyledButton>
          </ButtonsWrapper>
        </InnerWrapper>
      </StyledWrapper>
    );
  }
}

Card.propTypes = {
  animationDelay: PropTypes.number,
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  id: PropTypes.number.isRequired,
  dateInfo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  content: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};

Card.defaultProps = {
  animationDelay: 0,
  pageContext: 'notes',
  twitterName: null,
  articleUrl: null,
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(null, mapDispatchToProps)(withContext(Card));
