import React, { Component } from 'react';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import plusIcon from 'assets/plus.svg';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withContext from 'hoc/withContext';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  position: relative;
  padding: 0 1rem;
  
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      padding: 5rem 5rem 5rem 5rem;
    }
  
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport9} {
      padding: 5rem 15rem 5rem 5rem;
    }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  
      @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 3rem;
       }
       
      @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport12} {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 5rem;
      }
`;

const StyledPageHeader = styled.div`
  margin: 2rem 0 5rem;
`;

const StyledHeading = styled(Heading)`
  margin: 2.5rem 0 0 0;
  text-transform: capitalize;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};

`;

const StyledPlusButton = styled(ButtonIcon)`
  position: fixed;
  bottom: 9rem;
  right: 2rem;
  border-radius: 50%;
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : theme.notes)};
  background-size: 30%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08), 0 1px 12px rgba(0, 0, 0, 0.04);
  
  z-index: 110;
  :focus {
    outline: none;
  }
  
  :hover {
      background-color: ${({ theme }) => theme.white};

  }
    
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      bottom: 2rem;
      right: 2rem;
    }
`;

class GridTemplate extends Component {
  state = {
    isNewItemBarVisible: false,
  }

  handleNewItemBarVisible = () => {
    this.setState((prevState) => ({
      isNewItemBarVisible: !prevState.isNewItemBarVisible,
    }));
  };

  render() {
    const { children, pageContext } = this.props;
    const { isNewItemBarVisible } = this.state;

    return (
      <UserPageTemplate>
        <StyledWrapper>
          <StyledPageHeader>
            <Input search placeholder="Search..." activecolor={pageContext} />
            <StyledHeading big>
              {pageContext}
            </StyledHeading>
            <StyledParagraph>
              6
              {' '}
              {pageContext}
            </StyledParagraph>
          </StyledPageHeader>
          <StyledGrid>
            {children}
          </StyledGrid>
          <StyledPlusButton
            icon={plusIcon}
            activeColor={pageContext}
            onClick={this.handleNewItemBarVisible}
          />
          <NewItemBar handleClose={this.handleNewItemBarVisible} isVisible={isNewItemBarVisible} />
        </StyledWrapper>
      </UserPageTemplate>
    );
  }
}

GridTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
};

GridTemplate.defaultProps = {
  pageContext: 'notes',
};
export default withContext(GridTemplate);
