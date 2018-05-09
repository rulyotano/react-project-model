import React  from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import dialogService from '../../../service/dialog/dialogService'
import Segment from '../../common/segment/Segment';
import FilterDropDownData from "../../common/dropdown/filter-drop-down/_data/FilterDropDownData";


const DashBoard = ({username, token, createMockDialog, raiseMockNotification}) => (
    <Segment title="Dashboard" isDashboard={true}>

        <FilterDropDownData attrId="cdOperacao" attrLabel="descOperacao" onChange={(e)=>{console.log(e)}} placeHolder="Filter drop down async" name="dropdown-async" id="dropdown-async-id" targetKey="operation"/>

    </Segment>
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