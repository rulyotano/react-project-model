import React, { Component}  from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'

import Loadable from 'react-loadable'
import LoadingComponent from '../common/_LoadingComponent'
import configService from '../../service/config/configService'
import * as userActions from '../common/user/_duck/actions'
import '../../styles/css/app.css'
import '../../styles/css/sidebar.css'
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import 'perfect-scrollbar-react/dist/style.min.css';
import urlJoin from 'url-join';
import ROUTES from './routeNames';


const HomeAsync = Loadable({
    loader: () => import('./home/Home'),
    loading: LoadingComponent,
});

const CloseFieldAsync = Loadable({
    loader: () => import('./close-field/CloseField'),
    loading: LoadingComponent,
});

//#region Mock Tests
// const MonitoringAsync = Loadable({
//     loader: () => import('._mockTests/monitoring/Monitoring'),
//     loading: LoadingComponent,
// });

// const ChartTestAsync = Loadable({
//     loader: () => import('./_mockTests/chartTest/ChartTest'),
//     loading: LoadingComponent,
// });

// const FormTestAsync = Loadable({
//     loader: () => import('./_mockTests/redux-form-test/FormTest'),
//     loading: LoadingComponent,
// });
//#endregion

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
      let {match, loaded} = this.props;

      if (!loaded)
        return <LoadingComponent isLoading={true}/>

      ROUTES.BASE = match.url;
      ROUTES.MONITORING = urlJoin(match.url,"monitoring");
      ROUTES.CHART_TEST = urlJoin(match.url,"chart-test");
      ROUTES.FORM_TEST = urlJoin(match.url,"form-test");
      ROUTES.CLOSE_FIELD = urlJoin(match.url,"close-field");
      return (
          <div>
              <Header/>
              <Sidebar {...this.props}/>
              <div>
                  <Switch>
                      <Route exact path={ROUTES.BASE} component={HomeAsync}/>
                      {/* <Route path={ROUTES.MONITORING} component={MonitoringAsync}/>
                      <Route path={ROUTES.CHART_TEST} component={ChartTestAsync}/>
                      <Route path={ROUTES.FORM_TEST} component={FormTestAsync}/> */}
                      <Route path={ROUTES.CLOSE_FIELD} component={CloseFieldAsync}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)