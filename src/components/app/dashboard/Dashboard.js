import React  from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import dialogService from '../../../service/dialog/dialogService'
import Segment from '../../common/segment/Segment';
import FilterDropDownData from "../../common/dropdown/filter-drop-down/_data/FilterDropDownData";
import FilterDropDownDataOperation from "../../common/dropdown/filter-drop-down/_data/operation/FilterDropDownDataOperation";
import FilterDropDownDataFleet from "../../common/dropdown/filter-drop-down/_data/fleet/FilterDropDownDataFleet";
import FilterDropDownDataState from "../../common/dropdown/filter-drop-down/_data/state/FilterDropDownDataState";


const DashBoard = ({username, token, createMockDialog, raiseMockNotification}) => (
    <Segment title="Dashboard" isDashboard={true}>

        <FilterDropDownDataOperation id="dropdown-operation-id" name="dropdown-operation-name" onChange={(e)=>console.log(e)}/>
        <FilterDropDownDataFleet id="dropdown-fleet-id" name="dropdown-operation-name" onChange={(e)=>console.log(e)}/>
        <FilterDropDownDataState id="dropdown-state-id" name="dropdown-state-name" onChange={(e)=>console.log(e)}/>

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