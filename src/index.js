import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import store from './app/redux/store/store';

import './base.css';

import IndexApp from './app/App';

import Login from './app/containers/Login';


const appStore = store();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={appStore}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={IndexApp}/>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={IndexApp}/>
      </div>
    </Router>
  </Provider>,
	document.getElementById('root')
);
