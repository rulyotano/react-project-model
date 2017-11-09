import React, { Component}  from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import loginService from '../../../service/login/loginService';
import loginAuthDataService from '../../../service/login/loginAuthDataService';

import dialogService from '../../../service/dialog/dialogService'

const DashBoard = ({username, token, createMockDialog, raiseMockNotification}) => (
            <MuiThemeProvider>
                <div>                    
                    <h1>DashBoard</h1>
                    <span>username: {username}</span>
                    <br/>
                    <span>token: {token}</span>
                    <RaisedButton label='Logout' onClick={()=>loginService.logout()}/>
                    <RaisedButton label='Load test dialog' onClick={createMockDialog}/>
                    <RaisedButton label='Raise test notification' onClick={raiseMockNotification}/>
                </div>
            </MuiThemeProvider>
        );
        
const mapStateToProps = (state) => ({
    token: get(state, 'auth.user.token'),
    username: get(state, 'auth.user.username')
})

let testIndex = 0
const mapDispatchToProps = (dispatch) => ({
    createMockDialog(){
        dialogService.confirmOk(`title${testIndex}`, `body${testIndex++} ad adas`).then(response=>{
            console.log(`Dialog closed with ${response}`)
        })
    },
    raiseMockNotification(){
        dialogService.alert("", `Some notification in the Bottom ${testIndex++}`)
        dialogService.error("", `Some notification in the Bottom ${testIndex++}`)
        dialogService.success("", `Some notification in the Bottom ${testIndex++}`)
        dialogService.notification("", `Some notification in the Bottom ${testIndex++}`)
    }  
})

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);