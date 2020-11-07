import React from 'react';
import MainTemplate from 'templates/MainTemplate';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Notes from 'views/Notes';
import Twitters from 'views/Twitters';
import Articles from 'views/Articles';
import { routes } from 'routes';
import store, { persistor } from 'store';
import DetailsPage from 'views/DetailsPage';
import LoginPage from 'views/LoginPage';
import RegisterPage from 'views/RegisterPage';

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600&display=swap"
          rel="stylesheet"
        />
        <MainTemplate>
          <Switch>
            <Route key={routes.login} exact path={routes.login} component={LoginPage} />
            <Route key={routes.register} exact path={routes.register} component={RegisterPage} />
            <Route
              key={routes.home}
              exact
              path={routes.home}
              render={() => <Redirect to={routes.notes} />}
            />
            <Route key={routes.notes} exact path={routes.notes} component={Notes} />
            <Route key={routes.note} path={routes.note} component={DetailsPage} />
            <Route key={routes.twitters} exact path={routes.twitters} component={Twitters} />
            <Route key={routes.twitter} path={routes.twitter} component={DetailsPage} />
            <Route key={routes.articles} exact path={routes.articles} component={Articles} />
            <Route key={routes.article} path={routes.article} component={DetailsPage} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default Root;
