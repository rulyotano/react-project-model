import React, { Component}  from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import dialogService from '../../../service/dialog/dialogService'
import Segment from '../segment/Segment';


const DashBoard = ({username, token, createMockDialog, raiseMockNotification}) => (
            <Segment title="Dashboard" isDashboard={true}/>
        );
        
const mapStateToProps = (state) => ({
    token: get(state, 'auth.user.token'),
    username: get(state, 'auth.user.username')
})

let testIndex = 0;
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