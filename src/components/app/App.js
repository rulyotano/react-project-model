import React, { Component}  from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'

import LoadingComponent from '../common/_LoadingComponent'
import configService from '../../service/config/configService'
import * as userActions from '../common/user/_duck/actions'
import '../../styles/css/app.css'
import '../../styles/css/sidebar.css'
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import 'perfect-scrollbar-react/dist/style.min.css';
import {urlJoin} from '../../service/helperService';
// import ROUTES from './routeNames';
import loadable from '../common/loadable'
import closeFieldUrl from './close-field/routesNames'
import layerComparisonUrl from './field-layers-comparison/routesNames'
import homeUrl from './home/routeNames'


const HomeAsync = loadable(() => import('./home/Home'));
const CloseFieldAsync = loadable(() => import('./close-field/CloseField'));
const FieldLayersComparisonAsync = loadable(() => import('./field-layers-comparison/FieldLayersComparisonContainer'));

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

      const base = match.path;
      const home = urlJoin(base, homeUrl);
      const closeField = urlJoin(base, closeFieldUrl);
      const layerComparison = urlJoin(base, layerComparisonUrl)
      return (
          <div>
              <Header/>
              <Sidebar {...this.props}/>
              <div>
                  <Switch>
                      <Route exact path={home} component={HomeAsync}/>
                      <Route path={closeField} component={CloseFieldAsync}/>
                      <Route path={layerComparison} component={FieldLayersComparisonAsync}/>
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