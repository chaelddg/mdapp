import React from 'react';
import { Route } from 'react-router-dom';
import Patients from './Patients';
import CRM from './CRM';
import InboxItem from '../components/InboxItem';
import InboxInputs from '../components/InboxInputs';

const RouteContainer = ({ path }) => (
  <div>
    <Route path={`${path}/crm`} component={CRM} />
    <Route path={`${path}/inbox`} component={InboxItem} />
    <Route path={`${path}/results`} component={InboxInputs} />
    <Route path={`${path}/reports`} component={InboxInputs} />
    <Route path={`${path}/billing`} component={InboxInputs} />
    <Route path={`${path}/cashier`} component={InboxInputs} />
    <Route path={`${path}/patients`} component={Patients} />
    <Route path={`${path}/appointment`} component={InboxInputs} />
  </div>
);

export default RouteContainer;
