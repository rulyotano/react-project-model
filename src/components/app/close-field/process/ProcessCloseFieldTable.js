import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

const styles = theme => ({
    table: {
        maxHeight: 250,
        border:"1px solid #ddd",
        boxShadow:'1px 1px 5px 1px #3a36337d'
    },
});
const columns = [
    {key:'process', label:'Process', isNumeric:false},
    {key:'operation', label:'Operation', isNumeric:false},
    {key:'field', label:'Field', isNumeric:false},
    {key:'fieldArea', label:'Field Area (acre)', isNumeric:true},
    {key:'machineArea', label:'Machine Area (acre)', isNumeric:true},
    {key:'date', label:'Date', isNumeric:false},
    {key:'condition', label:'Condition', isNumeric:false},
];
let nextId = 1;
const createData = (obj) =>{
    return {id:nextId++, ...obj};
};
const data = [
   createData({process:"Process A", operation:"Operation A", field:"2117", fieldArea:1547, machineArea:1487, date:"25/05/2018", condition:"Closed"}),
   createData({process:"Process B", operation:"Operation B", field:"55", fieldArea:1135, machineArea:1101, date:"26/05/2018", condition:"Pendent"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process A", operation:"Operation A", field:"2117", fieldArea:1547, machineArea:1487, date:"25/05/2018", condition:"Closed"}),
   createData({process:"Process B", operation:"Operation B", field:"55", fieldArea:1135, machineArea:1101, date:"26/05/2018", condition:"Pendent"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process A", operation:"Operation A", field:"2117", fieldArea:1547, machineArea:1487, date:"25/05/2018", condition:"Closed"}),
   createData({process:"Process B", operation:"Operation B", field:"55", fieldArea:1135, machineArea:1101, date:"26/05/2018", condition:"Pendent"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),
   createData({process:"Process C", operation:"Operation C", field:"78", fieldArea:589, machineArea:585, date:"26/04/2018", condition:"In process"}),

];


class ProcessCloseFieldTable extends PureComponent{
    static contextTypes = {
        t: PropTypes.func,
    };
    state = {
        rowIdSelected:null,
        page:0,
    };
    selectRow(event , rowIdSelected){
        this.setState({rowIdSelected});
    };
    isSelected(rowId){
        const {rowIdSelected} = this.state;
        return rowId === rowIdSelected;
    };
    handleChangePage(){

    };
    handleChangeRowsPerPage(){

    };

    render(){

        const { classes } = this.props;
        const { page } = this.state;
        const { t } = this.context;

        const rowsPerPage =  window.innerHeight<=600 ? 8: window.innerHeight<= 768 ? 11:16;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return(
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {columns.map(h=><TableCell key={h.key} numeric={h.isNumeric}>{t(h.label)}</TableCell> )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(i=>
                        <TableRow key={i.id}
                                  hover onClick={event => this.selectRow(event, i.id)}
                                  selected={this.isSelected(i.id)}>
                            {columns.map(h=><TableCell numeric={h.isNumeric} key={h.key}>{i[h.key]}</TableCell>)}
                        </TableRow>
                    )}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 48 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        )
    }
}

ProcessCloseFieldTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProcessCloseFieldTable);