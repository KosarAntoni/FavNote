import React from 'react';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  padding: 1rem;
  
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

const GridTemplate = ({ children, pageType }) => (
  <UserPageTemplate pageType={pageType}>
    <StyledWrapper>
      <StyledPageHeader>
        <Input search placeholder="Search..." />
        <StyledHeading big>
          {pageType}
        </StyledHeading>
        <StyledParagraph>
          6
          {' '}
          {pageType}
          s
        </StyledParagraph>
      </StyledPageHeader>
      <StyledGrid>
        {children}
      </StyledGrid>
    </StyledWrapper>
  </UserPageTemplate>
);

GridTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']),
};

GridTemplate.defaultProps = {
  pageType: 'notes',
};
export default GridTemplate;
