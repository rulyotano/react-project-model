import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import {findIndex, orderBy} from 'lodash';
import ReadTable from './ReadTableComponent';
import EditTable from './EditTableComponent';
import EditColorTableComponent from './EditColorTableComponent';
import ColorsRangeGroup from '../../../../../service/maps/variables/groups/ColorsRangeGroup';

class EditableTableComponent extends PureComponent {
    static propTypes = {
        variable: PropTypes.any,
        selectedRangeGroup: PropTypes.object,
        t: PropTypes.func.isRequired,
        onEditingChange: PropTypes.func,
        onUpdateSelectedRangeGroup: PropTypes.func
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
        const {variable, onEditingChange = ()=>{}, onUpdateSelectedRangeGroup= ()=>{}} = this.props;
        const {editingRangeGroup} = this.state;
        editingRangeGroup.update({ranges: orderBy(editingRangeGroup.ranges, it=>it.minRaw || it.valueRaw || 0)});
        const index = findIndex(variable.rangeGroups, it=>it.id === editingRangeGroup.id);
        variable.rangeGroups = [
            ...variable.rangeGroups.slice(0, index), 
            editingRangeGroup, 
            ...variable.rangeGroups.slice(index+1, variable.rangeGroups.length)
        ];
        this.setState({isEditing: false, editingRangeGroup: null});
        onEditingChange(false);
        onUpdateSelectedRangeGroup(editingRangeGroup);
    }

    cancelEditing(){
        const {onEditingChange = ()=>{}} = this.props;
        this.setState({isEditing: false, editingRangeGroup: null});
        onEditingChange(false);
    }

    onColorsChange(values={}){
        const {editingRangeGroup} = this.state;
        editingRangeGroup.update(values);
        this.forceUpdate();
    }

    render(){
        const {variable, selectedRangeGroup, t} = this.props;
        const {isEditing, editingRangeGroup} = this.state;
        if (!variable)
            return null;
        let table = (<ReadTable variable={variable} selectedRangeGroup={selectedRangeGroup} t={t}/>);
        if (isEditing && selectedRangeGroup instanceof ColorsRangeGroup){
            table = (<EditColorTableComponent colors={selectedRangeGroup.colors} 
                        size={selectedRangeGroup.size} 
                        onChange={values=>this.onColorsChange(values)} t={t}/>);
        }
        else if (isEditing){
            table = (<EditTable variable={variable} editingRangeGroup={editingRangeGroup} t={t}/>);
        }
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

                {table}                
            </div>)
    }
}

export default EditableTableComponent
