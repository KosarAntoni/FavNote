import React from 'react';
import PageContext from 'context';

const withContext = (Component) => function contextComponent(props) {
  return (
    <PageContext.Consumer>
      {(context) => <Component props={props} pageContext={context} />}
    </PageContext.Consumer>
  );
};

export default withContext;
