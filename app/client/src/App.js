import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux";
import Auth from "./config/auth";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Admin from "./routes/Admin";
import NotFound from "./routes/NotFound";
import User from "./routes/Users/List";
import EditUser from "./routes/Users/Edit";

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              <Route
                exact
                path="/login"
                component={e => Auth.validate(Login, e, store)}
              />
              <Route exact path="/" component={e => Auth.authorize(Dashboard, e, store)} />
              <Route exact path="/admin" component={e => Auth.authorize(Admin, e, store)} />
              <Route exact path="/user" component={e => Auth.authorize(User, e, store)} />
              <Route exact path="/user/edit/:id" component={e => Auth.authorize(EditUser, e, store)} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
