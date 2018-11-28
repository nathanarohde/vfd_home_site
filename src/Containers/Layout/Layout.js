import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions';

import Header from '../../Components/Header/Header'
import Navigation from '../../Components/Navigation/Navigation'
import Main from '../../Components/Main/Main'
import Archive from '../Archive/Archive'

class Layout extends Component {

  componentDidMount () {
    this.props.onInitLastCartoon();
  }

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

const mapStateToProps = state => {
  return {
    lastCartoon: state.lastCartoon
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitLastCartoon: () => dispatch(actions.initLastCartoon())
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Layout);
