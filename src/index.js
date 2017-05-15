import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import store from './app/redux/store/store';

import './base.css';

import App from './app/App';
import Inbox from './app/containers/Inbox';
import Starred from './app/containers/Starred';
import InboxItem from './app/components/InboxItem';

const appStore = store();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={appStore}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={Starred} />
          <Route path="/starred" component={Starred} />
          <Inbox>
            <Route path="/inbox" component={Inbox}>
              <Route path=":id" component={InboxItem} />
            </Route>
          </Inbox>
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
