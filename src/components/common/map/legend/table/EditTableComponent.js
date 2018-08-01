import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ColorPicker from '../../../pickers/color';
import {VariableTypes} from '../../../../../service/maps/variables/groups/RangeGroup';
import dialogService from '../../../../../service/dialog/dialogService';
import {DialogButtonTypes} from '../../../../common/dialog/classes/DialogButton';
import TextField from '@material-ui/core/TextField';
import {maxBy, orderBy} from 'lodash';

const styles = theme => ({   
    table: {
        "&.":""
    },
    color:{
        height: "10px",
        width: "10px",
    },
    cellBody:{
        padding: "4px"
    },
    tableRow: {
        height: "20px"
    },
    insertingCellBody: {
        width: "40px"
    }
});

class EditTableComponent extends PureComponent {
    static propTypes = {
        variable: PropTypes.any,
        editingRangeGroup: PropTypes.object,
        t: PropTypes.func.isRequired
    }

    state = {        
        inserting: false,
        insertingRange: null
    }

    onRowDelete(row){
        const {t, editingRangeGroup} = this.props;
        if (editingRangeGroup.ranges.length === 1)
            return;
        dialogService.confirmYesNo(t("confirm delete row"), t("confirm delete row body")).then(res=>{
            if (res === DialogButtonTypes.YES) {                
                editingRangeGroup.update({
                    ranges: editingRangeGroup.ranges.filter(r=>r !== row)
                })
                this.forceUpdate();
            }
        })
    }

    startInserting(){
        const {editingRangeGroup} = this.props;
        const lastRange = maxBy(editingRangeGroup.ranges, r=>r.id);
        const lastId = lastRange.id+1;
        const insertingRange = lastRange.clone();
        insertingRange.id = lastId;
        insertingRange.color = "#000000"
        this.setState({inserting: true, insertingRange });
    }

    addInsertingRow(){
        const {editingRangeGroup} = this.props;
        const {insertingRange} = this.state;
        editingRangeGroup.update({
            ranges: orderBy([...editingRangeGroup.ranges, insertingRange], r=>r.minRaw || r.valueRaw || 0)
        })
        this.setState({inserting: false, insertingRange: null });        
    }

    cancelInsertingRow(){
        this.setState({inserting: false, insertingRange: null });
    }

    render(){
        const {variable, classes, editingRangeGroup, t} = this.props;
        const {inserting, insertingRange} = this.state;
        if (!variable)
            return null;
        const rw = variable.rangeView;
        let key = 0;
        const rowClasses = {root: classes.tableRow};
        return (
            <React.Fragment>
                { 
                    !inserting ? <Button onClick={()=>this.startInserting()}><AddIcon/></Button> : 
                    <React.Fragment>                        
                        <Table className={classes.table}>                            
                            <TableBody>
                                <Row key={key++} rowClasses={rowClasses} tClasses={classes} 
                                        item={insertingRange} rangeView={rw} isInsertRow={true}
                                        insertRowAdd={()=>this.addInsertingRow()} insertRowCancel={()=>this.cancelInsertingRow()}/>
                            </TableBody>
                        </Table>
                        <br/>
                        <br/>
                    </React.Fragment>
                }
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow classes={rowClasses}>
                            {rw.color ? <TableCell padding="checkbox"></TableCell> : null}
                            {rw.min ? <TableCell padding="checkbox">{t("mapLegend.Start")}</TableCell> : null}
                            {rw.min && rw.max ? <TableCell padding="checkbox"></TableCell> : null}
                            {rw.max ? <TableCell padding="checkbox">{t("mapLegend.End")}</TableCell> : null}
                            {rw.description ? <TableCell padding="checkbox">{t("mapLegend.Name")}</TableCell> : null}
                            {rw.value ? <TableCell padding="checkbox"></TableCell> : null}
                            {rw.suffix ? <TableCell padding="checkbox"></TableCell> : null}
                            {rw.extra1 ? <TableCell padding="checkbox"></TableCell> : null}
                            {rw.extra2 ? <TableCell padding="checkbox"></TableCell> : null}
                            {<TableCell padding="checkbox"></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {editingRangeGroup.ranges.map(item=>(
                            <Row key={key++} rowClasses={rowClasses} tClasses={classes} 
                                item={item} rangeView={rw} onDelete={()=>this.onRowDelete(item)}/>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>)
    }
}

class Row extends PureComponent {
    static propTypes = {
        item: PropTypes.any.isRequired,
        rowClasses: PropTypes.any,
        tClasses: PropTypes.any,
        rangeView: PropTypes.any,
        onDelete: PropTypes.func,
        isInsertRow: PropTypes.bool,
        insertRowAdd: PropTypes.func,
        insertRowCancel: PropTypes.func
    }

    state = {
        showColorPicker: false
    }

    setItemColor(item, color){
        item.color = color;
    }
    setItemValue(item, itemField, value){
        item[`${itemField}Raw`] = value;
        this.forceUpdate();
    }
    showColorPicker(show){
        this.setState({showColorPicker: show})
    }

    renderColorCell(classes, item){
        const {showColorPicker} = this.state;
        return (<ColorPicker show={showColorPicker} color={item.color} 
                    onChange={(color)=>this.setItemColor(item, color)} 
                    onClose={()=>this.showColorPicker(false)}>
                    <div className={classes.color} style={{backgroundColor: item.color}} onClick={()=>this.showColorPicker(true)}></div>
                </ColorPicker>);
    }
    renderValueCell(item, itemField){
        const valueRaw = item[`${itemField}Raw`];
        let valueEditor = null;

        if (item.variableType === VariableTypes.date){

        } else {
            valueEditor = <TextField value={valueRaw} onChange={(e)=>this.setItemValue(item, itemField, e.target.value)} inputProps={{type:"number", style:{width: "100px"}}}/>
        }

        return valueEditor;
    }
    render(){
        const { item, rowClasses, tClasses: classes, rangeView: rw, onDelete = ()=>{}, 
                isInsertRow, insertRowAdd, insertRowCancel } = this.props;
        return (<TableRow classes={rowClasses}>
            {rw.color ? <TableCell padding="checkbox">{this.renderColorCell(classes, item)}</TableCell> : null}
            {rw.min ? <TableCell padding="checkbox">{this.renderValueCell(item, "min")}</TableCell> : null}
            {rw.min && rw.max ? <TableCell padding="checkbox">-</TableCell> : null}
            {rw.max ? <TableCell padding="checkbox">{this.renderValueCell(item, "max")}</TableCell> : null}
            {rw.description ? <TableCell padding="checkbox">{item.description}</TableCell> : null}
            {rw.value ? <TableCell padding="checkbox">{this.renderValueCell(item, "value")}</TableCell> : null}
            {rw.suffix ? <TableCell padding="checkbox">{item.suffix}</TableCell> : null}
            {rw.extra1 ? <TableCell padding="checkbox">{item.extra1}</TableCell> : null}
            {rw.extra2 ? <TableCell padding="checkbox">{item.extra2}</TableCell> : null}
            { !isInsertRow ? <TableCell padding="checkbox"><Button onClick={onDelete}><DeleteOutlineIcon/></Button></TableCell>: null}
            { isInsertRow ? 
                <React.Fragment>                    
                    <TableCell padding="checkbox"><Button onClick={insertRowAdd}><CheckIcon/></Button></TableCell>
                    <TableCell padding="checkbox"><Button onClick={insertRowCancel}><CloseIcon/></Button></TableCell>
                </React.Fragment> : null}
        </TableRow>)
    }
}

export default withStyles(styles)(EditTableComponent)
