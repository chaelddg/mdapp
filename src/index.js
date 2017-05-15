import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import store from './app/redux/store/store';

import './base.css';

import App from './app/App';
import IndexApp from './app/containers/Index';

import Login from './app/containers/Login';
import Inbox from './app/containers/Inbox';
import StarredIndex from './app/containers/Starred';

import StarredItem from './app/components/StarredItem';
import InboxItem from './app/components/InboxItem';
import InboxInputs from './app/components/InboxInputs';

const appStore = store();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={appStore}>
    <Router history={history}>
      <div>
        <App>
          <Switch>
            <Route exact path="/login" component={InboxInputs} />
            <IndexApp>
              <Switch>
                <Route exact path="/starred" component={StarredIndex} />
                <Inbox>
                  <Route path="/inbox/:id" component={InboxItem} />
                  <Route path="/contents/:id" component={InboxInputs} />
                </Inbox>
              </Switch>
            </IndexApp>
          </Switch>
        </App>
      </div>
    </Router>
  </Provider>,
	document.getElementById('root')
);
