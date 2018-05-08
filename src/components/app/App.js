import React, { Component}  from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'

import Loadable from 'react-loadable'
import LoadingComponent from '../common/_LoadingComponent'
import configService from '../../service/config/configService'
import * as userActions from '../_store/actions/userActions'
import '../../styles/css/app.css'
import '../../styles/css/sidebar.css'
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";


const DashboardAsync = Loadable({
    loader: () => import('./dashboard/Dashboard'),
    loading: LoadingComponent,
});

const MonitoringAsync = Loadable({
    loader: () => import('./monitoring/Monitoring'),
    loading: LoadingComponent,
});

const TestMapAsync = Loadable({
    loader: () => import('./mapTest/MapTest'),
    loading: LoadingComponent,
});

const ChartTestAsync = Loadable({
    loader: () => import('./chartTest/ChartTest'),
    loading: LoadingComponent,
});

const FormTestAsync = Loadable({
    loader: () => import('./redux-form-test/FormTest'),
    loading: LoadingComponent,
});

export class App extends Component {

  static propTypes = {
  };

  state = {  };

  componentWillMount(){
    //load initial app config
    configService.loadGeneralParameters();      
    configService.loadUserProfile();      
    configService.loadUserUnits();
    this.props.loadUser();  
  }
  
  render() {
      let {match} = this.props;
      return (
          <div>
              <Header/>
              <Sidebar {...this.props}/>
              <div>
                  <Switch>
                      <Route exact path={match.url} component={DashboardAsync}/>
                      <Route path={`${match.url}monitoring`} component={MonitoringAsync}/>
                      <Route path={`${match.url}test-map`} component={TestMapAsync}/>
                      <Route path={`${match.url}chart-test`} component={ChartTestAsync}/>
                      <Route path={`${match.url}form-test`} component={FormTestAsync}/>
                  </Switch>
              </div>
          </div>            
      );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    loadUser: () => dispatch(userActions.loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App)