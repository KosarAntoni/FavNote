import React, { Component } from 'react';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import plusIcon from 'assets/plus.svg';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import withContext from 'hoc/withContext';
import Masonry from 'react-masonry-css';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import { motion } from 'framer-motion';
import UserPageTemplate from './UserPageTemplate';

const breakpointColumnsObj = {
  default: 4,
  2000: 3,
  1200: 2,
  480: 1,
};

const StyledWrapper = styled.div`
  position: relative;
  padding: 0 1rem;
  min-height: 75vh;
  display: ${({ isEmpty }) => isEmpty && 'flex'};
  flex-direction: ${({ isEmpty }) => isEmpty && 'column'};
  justify-content: ${({ isEmpty }) => isEmpty && 'center'};
  align-items: ${({ isEmpty }) => isEmpty && 'center'};
  
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      padding: 2rem 4rem 4rem 4rem;
    }
  
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport9} {
      padding: 2rem 15rem 5rem 5rem;
    }
`;

const StyledGrid = styled(Masonry)`
  display: flex;
  width: calc(100% + 2rem);
  margin: 0 -1rem;
`;

const StyledPageHeader = styled.div`
  margin: 2rem 0 5rem;
`;

const StyledHeading = motion.custom(styled(Heading)`
  margin: 2.5rem 0 0 0;
  text-transform: capitalize;
`);

const StyledParagraph = motion.custom(styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`);

const StyledPlusButton = styled(ButtonIcon)`
  position: fixed;
  bottom: 3rem;
  right: 2rem;
  border-radius: 50%;
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : theme.notes)};
  background-size: 30%;
  
  z-index: 110;
  transition: all 0.3s;

  ::after {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    top: 0;
    left: 0;
    
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08), 0 1px 12px rgba(0, 0, 0, 0.04);
    
    transition: all 0.3s;
  }
  
  :focus {
    outline: none;
  }
  
  :hover {
      background-color: ${({ theme }) => theme.white};
  }
    
  ${({ isClose }) => isClose && css`
    transform: rotate(45deg);
    
    ::after {
        transform: rotate(-45deg);
    }
  `}  
    
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      bottom: 2rem;
      right: 2rem;
    }
`;

const StyledIcon = styled(motion.div)`
    width: 12rem;
    height: 12rem;
    background-image:url(${({ icon }) => icon});
    background-size: 90%;
    background-position: center;
    background-repeat: no-repeat;
`;

const StyledEmptyPageHeading = motion.custom(styled(Heading)`
  margin: 2.5rem 0 0 0;
  text-transform: none;
  text-align: center;
  width: 25rem;
  
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      width: 100%;
    }
`);

class GridTemplate extends Component {
  state = {
    isNewItemBarVisible: false,
    searchBarValue: '',
    filteredContent: '',
  }

  handleNewItemBarVisible = () => {
    this.setState((prevState) => ({
      isNewItemBarVisible: !prevState.isNewItemBarVisible,
    }));
  };

  handleSearchBarInputChange = (val) => {
    this.setState({
      searchBarValue: val,
    });
  }

  filterContent = () => {
    const { searchBarValue } = this.state;
    const { children } = this.props;

    this.setState({
      filteredContent: children.filter((item) => (
        item.props.title.toUpperCase().includes(searchBarValue.toUpperCase())
        || item.props.content.toUpperCase().includes(searchBarValue.toUpperCase())
      )),
    });
  }

  render() {
    const {
      children, pageContext, isEmpty, icon,
    } = this.props;
    const { isNewItemBarVisible, searchBarValue, filteredContent } = this.state;
    const content = filteredContent || children;

    return (
      <UserPageTemplate>
        {isEmpty && (
        <StyledWrapper isEmpty={isEmpty}>
          <StyledIcon
            icon={icon}
            animate={{
              opacity: [0, 1],
              y: [10, -5, 0],
            }}
            transition={{
              duration: 0.3,
            }}
          />
          <StyledEmptyPageHeading
            animate={{
              opacity: [0, 1],
              y: [10, -5, 0],
            }}
            transition={{
              duration: 0.3,
            }}
          >
            Your
            {' '}
            {pageContext}
            {' '}
            will appear here!
          </StyledEmptyPageHeading>
        </StyledWrapper>
        )}

        {!isEmpty && (
        <StyledWrapper>
          <StyledPageHeader>
            <Input
              search
              placeholder="Search..."
              activecolor={pageContext}
              value={searchBarValue}
              onChange={({ target }) => this.handleSearchBarInputChange(target.value)}
              onKeyUp={this.filterContent}
            />
            <StyledHeading
              big
              animate={{
                opacity: [0, 1],
                y: [10, -5, 0],
              }}
              transition={{
                duration: 0.3,
              }}
            >
              {pageContext}
            </StyledHeading>
            <StyledParagraph
              animate={{
                opacity: [0, 1],
                y: [5, -2, 0],
              }}
              transition={{
                duration: 0.3,
                delay: 0.15,
              }}
            >
              {content.length}
              {' '}
              {pageContext}
            </StyledParagraph>
          </StyledPageHeader>
          <StyledGrid
            breakpointCols={breakpointColumnsObj}
            columnClassName="masonry-grid_column"
          >
            {content}
          </StyledGrid>

          <StyledPlusButton
            icon={plusIcon}
            activeColor={pageContext}
            onClick={this.handleNewItemBarVisible}
            isClose={isNewItemBarVisible}
          />
          <NewItemBar handleClose={this.handleNewItemBarVisible} isVisible={isNewItemBarVisible} />
        </StyledWrapper>
        )}
      </UserPageTemplate>
    );
  }
}

GridTemplate.propTypes = {
  isEmpty: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
};

GridTemplate.defaultProps = {
  isEmpty: false,
  pageContext: 'notes',
};

export default withContext(GridTemplate);
