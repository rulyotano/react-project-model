import React, { Component}  from 'react';
import {
  Route,
  Switch
} from 'react-router';
import { connect } from 'react-redux';

import LoadingComponent from '../common/_LoadingComponent';
import * as userActions from '../common/user/_duck/actions';
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import {urlJoin} from '../../service/helperService';
import loadable from '../common/loadable';
import homeUrl from './home/routeNames';


const HomeAsync = loadable(() => import('./home/Home'));

export class App extends Component {

  static propTypes = {
  };

  state = {  };

  componentWillMount(){
    this.props.loadUser();  
  }
  
  render() {
    const {match, loaded} = this.props;

    if (!loaded)
      return <LoadingComponent isLoading/>;

    const base = match.path;
    const home = urlJoin(base, homeUrl);
    return (
      <div>
        <Header/>
        <Sidebar {...this.props}/>
        <div>
          <Switch>
            <Route exact path={home} component={HomeAsync}/>
          </Switch>
        </div>
      </div>            
    );
  }
}

const mapStateToProps = (state) => ({
  loaded: !!state.app
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(userActions.loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);