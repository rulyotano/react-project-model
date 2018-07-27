import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import {findIndex, orderBy} from 'lodash';
import ReadTable from './ReadTableComponent';
import EditTable from './EditTableComponent';

class EditableTableComponent extends PureComponent {
    static propTypes = {
        variable: PropTypes.any,
        selectedRangeGroup: PropTypes.object,
        t: PropTypes.func.isRequired,
        onEditingChange: PropTypes.func
    }

    state = {
        isEditing: false,
        editingRangeGroup: null
    }

    startEditing(){
        const {selectedRangeGroup, onEditingChange = ()=>{}} = this.props;
        if (selectedRangeGroup){         
            this.setState({isEditing: true, editingRangeGroup: selectedRangeGroup.clone()});   
            onEditingChange(true);
        }
    }

    saveEditing(){
        const {selectedRangeGroup = ()=>{}, variable, onEditingChange = ()=>{}} = this.props;
        const {editingRangeGroup} = this.state;
        selectedRangeGroup.ranges = orderBy(editingRangeGroup.ranges, it=>it.minRaw || it.valueRaw || 0);
        const index = findIndex(variable.rangeGroups, it=>it.id === selectedRangeGroup.id);
        variable.rangeGroups = [
            ...variable.rangeGroups.slice(0, index), 
            selectedRangeGroup, 
            ...variable.rangeGroups.slice(index+1, variable.rangeGroups.length)
        ];
        this.setState({isEditing: false, editingRangeGroup: null});
        onEditingChange(false);
    }

    cancelEditing(){
        const {onEditingChange = ()=>{}} = this.props;
        this.setState({isEditing: false, editingRangeGroup: null});
        onEditingChange(false);
    }

    render(){
        const {variable, selectedRangeGroup, t} = this.props;
        const {isEditing, editingRangeGroup} = this.state;
        if (!variable)
            return null;
        return (
            <div>                
                <React.Fragment>
                    {isEditing ? null : <Button onClick={()=>this.startEditing()}>{t("Edit")}</Button>}
                    {isEditing ? 
                        <React.Fragment>
                            <Button onClick={()=>this.saveEditing()}>{t("Save")}</Button>
                            <Button onClick={()=>this.cancelEditing()}>{t("Cancel")}</Button>
                        </React.Fragment> : null
                    }
                    <br/>
                    <br/>
                </React.Fragment>

                {isEditing ? 
                    <EditTable variable={variable} editingRangeGroup={editingRangeGroup} t={t}/> : 
                    <ReadTable variable={variable} selectedRangeGroup={selectedRangeGroup} t={t}/>}                
            </div>)
    }
}

export default EditableTableComponent
