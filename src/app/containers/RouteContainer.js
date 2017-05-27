import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import CRM from './CRM';
import InboxItem from '../components/InboxItem';
import InboxInputs from '../components/InboxInputs';

const RouteContainer = ({ path }) => (
  <div>
    <Route exact path={path} component={Dashboard} />
    <Route path={`${path}/crm`} component={CRM} />
    <Route path={`${path}/inbox`} component={InboxItem} />
    <Route path={`${path}/send-email`} component={InboxInputs} />
  </div>
);

export default RouteContainer;
