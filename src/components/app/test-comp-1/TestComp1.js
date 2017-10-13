import React, { Component}  from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';

class TestComponent1 extends Component {
    state = {  }
    render() {
        return (
            <MuiThemeProvider>
                <RaisedButton label="Material UI is works" />
            </MuiThemeProvider>
        );
    }
}

export default TestComponent1;