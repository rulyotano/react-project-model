import React, { Component}  from 'react'
import {
  Route,
  Link, Switch
} from 'react-router-dom'

import Loadable from 'react-loadable';
import LoadingComponent from '../_LoadingComponent';
import TestComp1 from './test-comp-1/TestComp1'

const DashboardAsync = Loadable({
    loader: () => import('./dashboard/Dashboard'),
    loading: LoadingComponent,
  });

// const TestComp1Async = Loadable({
//     loader: () => import('./test-comp-1/TestComp1'),
//     loading: LoadingComponent,
//   });

class App extends Component {
    state = {  }
    render() {
        let match = this.props.match
        return (
            <div>
                <div>
                    Side Bar
                    <ul>
                        <li><Link to={`${match.url}`}>Dashboard</Link></li>
                        <li><Link to={`${match.url}test-comp-1`}>Test Comp 1</Link></li>
                    </ul>
                </div>
                <div>
                    <Switch>                        
                        <Route path={`${match.url}test-comp-1`} component={TestComp1}/>
                        <Route exact path={match.url} component={DashboardAsync}/>
                    </Switch>
                </div>
            </div>            
        );
    }
}

export default App;