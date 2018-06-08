import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Table, TableHead, TableRow, TableBody,
    TableCell, TableFooter, TablePagination} from '@material-ui/core';
import {isFunction} from 'lodash';

const styles = theme => ({
    table: {
        border:"1px solid #ddd",
        boxShadow:'1px 1px 2px 1px #ddd',
        minWidth: 1020,
        width: "calc(100% - 2px)"
    },
    tableWrapper:{
        overflowY: 'auto',
        height: '100%'
    },
    tableRow:{
        maxHeight:'48px !important'
    }
});

class DataTable extends PureComponent {
    static propTypes = {
        headerConfig: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
            isNumeric: PropTypes.bool,
            key: PropTypes.string.isRequired
        })).isRequired,
        data: PropTypes.arrayOf(PropTypes.object),

        //row selection
        onSelectionChanged: PropTypes.func,
        multiSelect: PropTypes.bool,
        rowKey: PropTypes.any
    }
    static contextTypes = {
        t: PropTypes.func,
    }

    state = {
        selection: {}
    }

    _getRowKey(it){
        const {rowKey} = this.props;
        if (rowKey !== undefined)
            return it[rowKey];
        return it;
    }

    onRowClick(it){
        const {onSelectionChanged, multiSelect, headerConfig} = this.props;
        const {selection} = this.state;
        const key = this._getRowKey(it);

        let result = selection;
        //if is selected then un-select
        if (selection[key]){
            result = {...selection};
            result[key] = undefined;
        } 
        else if (multiSelect){
            result = {...selection, [key]: it};
        } else {
            result = {[key]: it};
        }
        this.setState({ selection: result });

        if (isFunction(onSelectionChanged))
            onSelectionChanged(result);
    }    

    render(){
        const { t } = this.context;
        const { classes, headerConfig, data=[] } = this.props;
        const { selection } = this.state;

        const pagedData = data;

        return <div className={classes.tableWrapper}>

        <Table className={classes.table} component="div">
            <TableHead component="div">
                <TableRow component="div">
                    {headerConfig.map(h=><TableCell component="div" key={h.key} numeric={h.isNumeric}>{h.content}</TableCell> )}
                </TableRow>
            </TableHead>
            <TableBody component="div">
                {
                    pagedData.map(it=>
                        <TableRow key={this._getRowKey(it)}
                                component="div"
                                hover 
                                onClick={() => this.onRowClick(it)}
                                selected={selection[this._getRowKey(it)]}
                                className={classes.tableRow}>
                            {headerConfig.map(col=><TableCell component="div" numeric={col.isNumeric} key={col.key}>{it[col.key]}</TableCell>)}
                        </TableRow>)
                }
            </TableBody>
            {/* <TableFooter>
                <TableRow>
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
            </TableFooter> */}
        </Table>
    </div>
    }
}

export default withStyles(styles)(DataTable);