import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './redux';
import Auth from './config/auth';

import Home from './routes/Home';
import Edit from './routes/Edit';
import Client from './routes/Client';
import Login from './routes/Login';


const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path="/" component={e => Auth.authorize(Home, e, store, "Dashboard")} />
              <Route exact path="/edit" component={e => Auth.authorize(Edit, e, store, "Dashboard")} />
              <Route exact path="/client" component={e => Auth.authorize(Client, e, store, "Dashboard")} />
              <Route exact path="/login" component={e => Auth.validate(Login, e, store)} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;