import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Header from '../../Components/Header/Header'
import Navigation from '../../Components/Navigation/Navigation'
import Main from '../../Components/Main/Main'
import Archive from '../../Components/Archive/Archive'

const layout = () => (
  <div>
    <Header></Header>
    <Navigation></Navigation>
    <Switch>
      <Route path="/archive" component={Archive} />
      <Route path="/" component={Main} />
    </Switch>
  </div>
)

export default layout;
