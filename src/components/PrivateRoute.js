import React from 'react';
import {
  Route,
  Redirect
  , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {setRedirect, clearRedirect} from './common/auth/_duck/actions';



class PrivateRoute extends React.PureComponent{
  componentWillMount(){
    if (this.props.logged && this.props.redirect)
    {
      this.props.history.push(this.props.redirect);
      this.props.clearRedirect();
    } else if (!this.props.logged){
      this.props.setRedirect(this.props.location.pathname + this.props.location.search);
    }
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.logged && this.props.logged){
      this.props.setRedirect(this.props.location.pathname + this.props.location.search);
    } else if (nextProps.logged && !this.props.logged && nextProps.redirect){
      this.props.history.push(nextProps.redirect);
      this.props.clearRedirect();
    }
  }

  render(){
    const { logged, component: Component, location, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (logged ? (<Component {...props}/>) :(
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
      )}/>
    );
  }
}

export default withRouter(connect( (state) => ({
  logged: state.auth.logged,
  redirect: state.auth.redirect
}), dispatch => ({
  setRedirect: (redirect)=>dispatch(setRedirect(redirect)),
  clearRedirect: ()=>dispatch(clearRedirect()),
}))(PrivateRoute));