import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Entries } from './components/Home';
import { NotFound } from './components/NotFound';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Entries} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}
