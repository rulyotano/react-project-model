import React, { Component}  from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import loginService from '../../../service/login/loginService';
import loginAuthDataService from '../../../service/login/loginAuthDataService';

const mapStateToProps = (state) => ({
        token: get(state, 'auth.user.token'),
        username: get(state, 'auth.user.username')
    })

const DashBoard = ({username, token}) => (
            <MuiThemeProvider>
                <div>                    
                    <h1>DashBoard</h1>
                    <span>username: {username}</span>
                    <br/>
                    <span>token: {token}</span>
                    <RaisedButton label='Logout' onClick={()=>loginService.logout()}/>
                </div>
            </MuiThemeProvider>
        );

export default connect(mapStateToProps)(DashBoard);