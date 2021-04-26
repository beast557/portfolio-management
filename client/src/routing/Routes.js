import React,{Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute'

import Login from '../component/pages/Login';
import Register from '../component/pages/Register'
import Dashboard from '../component/pages/Dashboard'
import  Transaction  from '../component/pages/Transaction';
import  Companies  from '../component/pages/Companies';
import  Company  from '../component/pages/Company';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route  path='/' component={Login} exact/>
        <Route  path='/signup' component={Register} exact/>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/transaction' component={Transaction} />
        <PrivateRoute exact path='/companies' component={Companies} />
        <PrivateRoute exact path='/company/:companyId' component={Company} />
      </Switch>
      </Fragment>
  );
};

export default Routes;