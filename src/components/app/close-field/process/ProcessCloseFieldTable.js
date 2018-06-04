import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { forEach, isNaN, head } from 'lodash';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

const styles = theme => ({
    table: {
        border:"1px solid #ddd",
        boxShadow:'1px 1px 2px 1px #ddd',
        minWidth: 1020
    },
    tableWrapper:{
        overflowX: 'auto',
    },
    tableRow:{
        maxHeight:'48px !important'
    }
});
const columns = [];

class ProcessCloseFieldTable extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            rowIdSelected:null,
            page:0,
            rowsPerPage:window.innerHeight<=600 ? 7: window.innerHeight<= 768 ? 10:15
        }
    }
    static contextTypes = {
        t: PropTypes.func,
    };
    selectRow(event , idSelected){
        const rowIdSelected = this.state.rowIdSelected === idSelected ? null:idSelected;
        this.setState({rowIdSelected});
    };
    isSelected(rowId){
        const {rowIdSelected} = this.state;
        return rowId === rowIdSelected;
    };
    handleChangePage(event, page){
        this.setState({ page });
    };
    componentWillMount(){

        let { data } = this.props;
        let { t } = this.context;
        let qtdColumns = 0;
        forEach(head(data), (value, key)=>{

            qtdColumns++;
            columns.push({key, label:t(key), isNumeric:!isNaN(value)});
            if(qtdColumns >= 17)
                return false;
        })
    }

    render(){

        const { classes, children, data=[] } = this.props;
        const { page, rowsPerPage, rowIdSelected } = this.state;
        const { t } = this.context;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return(
            <div className={classes.tableWrapper}>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {columns.map(h=><TableCell key={h.key} numeric={h.isNumeric}>{t(h.label)}</TableCell> )}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(i=>
                            <TableRow key={i.cdId}
                                      hover onClick={event => this.selectRow(event, i.cdId)}
                                      selected={this.isSelected(i.cdId)}
                                      className={classes.tableRow}>
                                {columns.map(h=><TableCell numeric={h.isNumeric} key={h.key}>{i[h.key]}</TableCell>)}
                            </TableRow>
                        )}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={columns.length} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>
                                {children && rowIdSelected > 0 &&(
                                    children
                                )}
                            </TableCell>
                            <TablePagination
                                component={TableCell}
                                style={{position:"absolute", right:0}}
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('of')} ${count}`}
                                rowsPerPageOptions={[]}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{'aria-label': t('Previous Page')}}
                                nextIconButtonProps={{'aria-label': t('Next Page')}}
                                onChangePage={(event, page)=>this.handleChangePage(event, page)}
                            />

                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        )
    }
}

ProcessCloseFieldTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    data: state.app.closeField.process.data,
});


export default connect(mapStateToProps)(withStyles(styles)(ProcessCloseFieldTable));