import React from 'react';
import { render } from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from "history";
import AppProvider from "./context";
import './index.css';
import { Login } from './components/login/Login';

var hist = createBrowserHistory();

document.title = "Cosmicrafts Airdrop";

render(
  <AppProvider>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={Login}></Route>
      </Switch>
    </Router>
  </AppProvider>, 
  document.getElementById("root")
);