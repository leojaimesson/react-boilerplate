import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import history from './history';
import WelcomePage from '../containers/pages/WelcomePage';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
