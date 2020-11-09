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
import { AnimatePresence } from 'framer-motion';

const Root = () => (
  <Provider store={store}>
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600&display=swap"
      rel="stylesheet"
    />
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MainTemplate>
          <Route render={({ location }) => (
            <>
              <AnimatePresence initial={false}>
                <Switch location={location} key={location.pathname}>
                  <Route exact path={routes.login} component={LoginPage} />
                  <Route exact path={routes.register} component={RegisterPage} />
                  <Route path={routes.note} component={DetailsPage} />
                  <Route path={routes.twitter} component={DetailsPage} />
                  <Route path={routes.article} component={DetailsPage} />
                </Switch>
              </AnimatePresence>
              <Route
                exact
                path={routes.home}
                render={() => <Redirect to={routes.notes} />}
              />
              <Route exact path={routes.notes} component={Notes} />
              <Route exact path={routes.twitters} component={Twitters} />
              <Route exact path={routes.articles} component={Articles} />
            </>
          )}
          />
        </MainTemplate>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default Root;
