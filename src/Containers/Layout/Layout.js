import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../../Components/Header/Header'
import Navigation from '../../Components/Navigation/Navigation'
import Main from '../../Components/Main/Main'
import Archive from '../Archive/Archive'

class Layout extends Component {

  render () {
    return (
      <div>
        <Header></Header>
        <Navigation></Navigation>
        <Switch>
          <Route path="/archive" component={Archive} />
          <Route path="/:id" component={Main} />
          <Route path="/" component={Main} />
        </Switch>
      </div>
    )
  }
}

export default Layout;
