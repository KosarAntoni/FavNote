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
import PrivateRoute from 'utils/PrivateRoute';

const Root = () => (
  <Provider store={store}>
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600&display=swap"
      rel="stylesheet"
    />
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path={routes.login} component={LoginPage} />
            <Route exact path={routes.register} component={RegisterPage} />
            <PrivateRoute path={routes.note} component={DetailsPage} />
            <PrivateRoute path={routes.twitter} component={DetailsPage} />
            <PrivateRoute path={routes.article} component={DetailsPage} />
            <PrivateRoute exact path={routes.notes} component={Notes} />
            <PrivateRoute exact path={routes.twitters} component={Twitters} />
            <PrivateRoute exact path={routes.articles} component={Articles} />
            <Route
              path={routes.home}
              render={() => <Redirect to={routes.notes} />}
            />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default Root;
