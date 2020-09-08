import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import noteIcon from 'assets/sticky-note-solid.svg';
import logoutIcon from 'assets/sign-out-alt-solid.svg';
import penIcon from 'assets/pen-alt-solid.svg';
import twitterIcon from 'assets/twitter-brands.svg';
import PropTypes from 'prop-types';
import { routes } from 'routes';
import withContext from 'hoc/withContext';

const SidebarWraper = styled.div`
    z-index: 20;

    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;

    left: 0;
    bottom: 0;
    width: 100%;
    height: 8rem;
    
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.02), 0 1px 12px rgba(0, 0, 0, 0.12);
    background-color: ${({ theme, activeColor }) => (activeColor ? theme[activeColor] : theme.note)};

    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      top: 2rem;
      left: 2rem;
      bottom: auto;
      flex-direction: column;
      align-items: center;
      width: 10rem;
      height: auto;
      padding: 1rem;
      border-radius: 1rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12), 0 1px 8px rgba(0, 0, 0, 0.1);    
    }
`;

const LogOutButton = styled(ButtonIcon)`
    order: -1;
    @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
      order: 1;
    }
`;

const ButtonsWrapper = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
  
      @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} {
        flex-direction: column;
      }
`;

const Sidebar = ({ pageContext }) => (
  <SidebarWraper activeColor={pageContext}>
    <ButtonsWrapper>
      <li>
        <ButtonIcon as={NavLink} to={routes.notes} activeClassName="active" icon={noteIcon} />
      </li>
      <li>
        <ButtonIcon as={NavLink} to={routes.twitters} activeClassName="active" icon={twitterIcon} />
      </li>
      <li>
        <ButtonIcon as={NavLink} to={routes.articles} activeClassName="active" icon={penIcon} />
      </li>
    </ButtonsWrapper>
    <LogOutButton as={Link} to="/" icon={logoutIcon} />
  </SidebarWraper>
);

Sidebar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
};

Sidebar.defaultProps = {
  pageContext: 'notes',
};

export default withContext(Sidebar);
