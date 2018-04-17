import React, { Component}  from 'react'
import {
  Route,
  Link, Switch
} from 'react-router-dom'
import { connect } from 'react-redux'

import Loadable from 'react-loadable'
import LoadingComponent from '../common/_LoadingComponent'
import configService from '../../service/config/configService'
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


export class App extends Component {
  constructor(){
    super();

    //load initial app config
    configService.loadGeneralParameters();      
    configService.loadUserProfile();      
    configService.loadUserUnits();      
  }

  static propTypes = {
  };

  state = {  };
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
                  </Switch>
              </div>
          </div>            
      );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App)