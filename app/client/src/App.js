import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './redux';
import Auth from './config/auth';

import Login from './routes/Login';
import Home from './routes/Home';
import Edit from './routes/Edit';

import Users from './routes/Users/List';
import NewUser from './routes/Users/New';
import EditUser from './routes/Users/Edit';
import User from './routes/Users/Info';

import Teams from './routes/Teams/List';
import NewTeam from './routes/Teams/New';
import EditTeam from './routes/Teams/Edit';
import Team from './routes/Teams/Info';

import Contracts from './routes/Contracts/List';
import NewContract from './routes/Contracts/New';
import EditContract from './routes/Contracts/Edit';
import Contract from './routes/Contracts/Info';

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path="/login" component={e => Auth.validate(Login, e, store)} />

              <Route exact path="/" component={e => Auth.authorize(Home, e, store, "Dashboard")} />
              <Route exact path="/edit" component={e => Auth.authorize(Edit, e, store, "Edit Test")} />

              <Route exact path="/users" component={e => Auth.authorize(Users, e, store, "Users")} />
              <Route exact path="/user/:id" component={e => Auth.authorize(User, e, store, "User Info")} />
              <Route exact path="/user/:id/new" component={e => Auth.authorize(NewUser, e, store, "New User")} />
              <Route exact path="/user/:id/edit" component={e => Auth.authorize(EditUser, e, store, "Edit User")} />

              <Route exact path="/teams" component={e => Auth.authorize(Teams, e, store, "Teams")} />
              <Route exact path="/team/:id" component={e => Auth.authorize(Team, e, store, "Team Info")} />
              <Route exact path="/team/:id/new" component={e => Auth.authorize(NewTeam, e, store, "New Team")} />
              <Route exact path="/team/:id/edit" component={e => Auth.authorize(EditTeam, e, store, "Edit Team")} />

              <Route exact path="/contracts" component={e => Auth.authorize(Contracts, e, store, "Contracts")} />
              <Route exact path="/contract/:id" component={e => Auth.authorize(Contract, e, store, "Contract Info")} />
              <Route exact path="/contract/:id/new" component={e => Auth.authorize(NewContract, e, store, "New Contract")} />
              <Route exact path="/contract/:id/edit" component={e => Auth.authorize(EditContract, e, store, "Edit Contract")} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;