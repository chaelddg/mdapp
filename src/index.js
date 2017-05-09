import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.css';
import './index.css';

import App from './App';
import Inbox from './Inbox';
import Starred from './Starred';
import InboxItem from './InboxItem';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App>
      <Switch>
        <Route exact path="/" component={Starred} />
        <Route path="/starred" component={Starred} />
        <Inbox>
          <Route path="/inbox" component={Inbox} />
          <Route path="/inbox/:id" component={InboxItem} />
        </Inbox>
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
);
