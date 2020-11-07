import React from 'react';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedWrapper = motion.div;

const UserPageTemplate = ({ children, keyInfo }) => (
  <>
    <Sidebar />
    <AnimatePresence exitBeforeEnter>
      <AnimatedWrapper
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        key={keyInfo}
        exit={{
          opacity: 0,
          transition: { duration: 0.15 },
        }}
        transition={{ duration: keyInfo === 'DetailsTemplate' ? 0.3 : 0.15 }}
      >
        {children}
      </AnimatedWrapper>
    </AnimatePresence>
  </>
);

UserPageTemplate.propTypes = {
  keyInfo: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

UserPageTemplate.defaultProps = {
  keyInfo: '',
};

export default UserPageTemplate;
