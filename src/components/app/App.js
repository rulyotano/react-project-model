import React, { Component}  from 'react'
import {
  Route,
  Link, Switch
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loadable from 'react-loadable'
import LoadingComponent from '../common/_LoadingComponent'

import '../../styles/css/app.css'
import '../../styles/css/sidebar.css'
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";


const SegmentAsync = Loadable({
    loader: () => import('./segment/Segment'),
    loading: LoadingComponent,
  });


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {}

export class App extends Component {
  static propTypes = {
  }

  state = {  };
  render() {
      let {match} = this.props;
      return (
          <div>
              <Header/>
              <Sidebar {...this.props}/>
              <div>
                  <Switch>
                      <Route exact path={match.url} component={SegmentAsync}/>
                  </Switch>
              </div>
          </div>            
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)