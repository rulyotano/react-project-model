import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'

import { connect } from 'react-redux'
import { get } from 'lodash'


const mapStateToProps = (state) => ({
    logged: get(state, 'auth.logged')    
})

const PrivateRoute = ({ logged, component: Component, ...rest }) => (
    <Route {...rest} render={props => (logged ? (<Component {...props}/>) :(
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )
  
export default connect(mapStateToProps)(PrivateRoute)