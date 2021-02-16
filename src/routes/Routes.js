import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import NewsHome from "../components/NewsHome";
import UserProfile from "../components/UserProfile";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <NewsHome />}
          />
          <Route
            exact
            path="/user/:id"
            render={() => <UserProfile />}
          />
        </Switch>
      </Router>
    );
  }
}
