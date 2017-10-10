import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Loadable from 'react-loadable';
import LoadingComponent from './_LoadingComponent';

const AppAsync = Loadable({
    loader: () => import('./app/App'),
    loading: LoadingComponent,
  });

const LoginAsync = Loadable({
    loader: () => import('./login/Login'),
    loading: LoadingComponent,
  });

const AppRouter = () => (
    <Router>
      <div>
        {/* Common all app things here        */}
  
        <Route exact path="/login" component={LoginAsync}/>
        <Route path="/" component={AppAsync}/>
      </div>
    </Router>
  )
  export default AppRouter