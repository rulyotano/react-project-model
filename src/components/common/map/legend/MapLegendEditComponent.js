import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core'
import Dlg from '../../dialog-component/DialogComponent'
import Select from "../../select/Select";
import {find, forEach} from "lodash";
import EditableTableComponent from "./table/EditableTableComponent";
import ReadTableComponent from "./table/ReadTableComponent";

export default class MapLegendEditComponent extends PureComponent {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        variable: PropTypes.object.isRequired,
        t: PropTypes.func.isRequired,
        selectedVariableRange: PropTypes.object.isRequired,
        onChangeSelectedVariableRange: PropTypes.func.isRequired,
    }
    state = {
        selectedVariableRange: this.props.selectedVariableRange,
        editing: false
    }
    componentWillReceiveProps(newProps){
        if (newProps.selectedVariableRange 
            && this.props.selectedVariableRange !== newProps.selectedVariableRange)
        {
            this.setState({selectedVariableRange: newProps.selectedVariableRange})
        }
    }
    onSelectedVariableRangeChange(variableRangeId){
        var variableRange = variableRangeId ? 
            find(this.props.variable.rangeGroups, it=>it.id === variableRangeId) : null;
        this.setState({selectedVariableRange: variableRange && variableRange.clone() });
    }
    renderTable(variable, selectedVariableRange, t){
        if (selectedVariableRange.canEdit){
            return <EditableTableComponent variable={variable} selectedRangeGroup={selectedVariableRange} t={t} 
                        onEditingChange={val=>this.onEditingChange(val)} 
                        onUpdateSelectedRangeGroup={selRangeGroup=>this.setState({ selectedVariableRange: selRangeGroup })}/>
        } else {
            return <ReadTableComponent variable={variable} selectedRangeGroup={selectedVariableRange} t={t}/>
        }
    }
    onEditingChange(editing){
        this.setState({editing})
    }
    accept(){
        const {onClose, onChangeSelectedVariableRange} = this.props;
        const {variable} = this.props;
        forEach(variable.rangeGroups, rg=>rg.save());
        onChangeSelectedVariableRange(this.state.selectedVariableRange.clone());
        onClose();
    }
    cancel(){
        const {onClose} = this.props;
        onClose();
    }
    render() {
        const {open, t, variable} = this.props;
        const {selectedVariableRange, editing} = this.state;
        var variableRanges = variable.rangeGroups;
        return (
            <Dlg open={open}
                fullWidth={true}>
                <Dlg.Header>
                    <p>Ranges Configuration</p>
                </Dlg.Header>
                <Dlg.Body>
                    <Select id="variable-ranges" name="variable-ranges" label={t("map.Variable Ranges")}
                        attrId="id" attrLabel="name" isRequired={true} suggestions={variableRanges}
                        value={selectedVariableRange&&selectedVariableRange.id} onChange={(val)=>this.onSelectedVariableRangeChange(val)}
                        t={t}/>

                    <br/>
                    <br/>

                    {!!selectedVariableRange ? this.renderTable(variable, selectedVariableRange, t) : null}
                </Dlg.Body>
                <Dlg.Footer>
                    <Button color="primary" onClick={()=>this.accept()} disabled={editing}>
                        <p>Accept</p>
                    </Button>
                    <Button color="primary" onClick={()=>this.cancel()} disabled={editing}>
                        <p>Cancel</p>
                    </Button>
                </Dlg.Footer>
        </Dlg>
        )
    }
}