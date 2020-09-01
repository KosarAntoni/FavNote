import React from 'react';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import PropTypes from 'prop-types';

const UserPageTemplate = ({ children, pageType }) => (
  <>
    <Sidebar pageType={pageType} />
    {children}
  </>
);

UserPageTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']),
};

UserPageTemplate.defaultProps = {
  pageType: 'notes',
};
export default UserPageTemplate;
