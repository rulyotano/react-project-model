import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {find} from 'lodash'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
        height: "32px"
    }
  });

const MapCloseFieldRangeTable = ({variable, classes}) =>{
    if (!variable)
        return null;
    const rw = variable.rangeView;
    let key = 0;
    const cellClasses = {body: classes.cellBody};
    const rowClasses = {root: classes.tableRow};
    return (
    <Table className={classes.table}>
        <TableHead>
          <TableRow classes={rowClasses}>
            {rw.color ? <TableCell padding="checkbox"></TableCell> : null}
            {rw.min /*TODO: i18n*/ ? <TableCell padding="checkbox">Start</TableCell> : null}
            {rw.min && rw.max ? <TableCell padding="checkbox"></TableCell> : null}
            {rw.max /*TODO: i18n*/ ? <TableCell padding="checkbox">End</TableCell> : null}
            {rw.description /*TODO: i18n*/ ? <TableCell padding="checkbox">Name</TableCell> : null}
            {rw.value ? <TableCell padding="checkbox"></TableCell> : null}
            {rw.suffix ? <TableCell padding="checkbox"></TableCell> : null}
            {rw.extra1 ? <TableCell padding="checkbox"></TableCell> : null}
            {rw.extra2 ? <TableCell padding="checkbox"></TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
            {variable.ranges.map(item=>(
                <TableRow key={key++} classes={rowClasses}>
                    {rw.color ? <TableCell padding="checkbox"><div className={classes.color} style={{backgroundColor: item.color}}></div></TableCell> : null}
                    {rw.min ? <TableCell padding="checkbox">{item.min}</TableCell> : null}
                    {rw.min && rw.max ? <TableCell padding="checkbox">-</TableCell> : null}
                    {rw.max ? <TableCell padding="checkbox">{item.max}</TableCell> : null}
                    {rw.description ? <TableCell padding="checkbox">{item.description}</TableCell> : null}
                    {rw.value ? <TableCell padding="checkbox">{item.value}</TableCell> : null}
                    {rw.suffix ? <TableCell padding="checkbox">{item.suffix}</TableCell> : null}
                    {rw.extra1 ? <TableCell padding="checkbox">{item.extra1}</TableCell> : null}
                    {rw.extra2 ? <TableCell padding="checkbox">{item.extra2}</TableCell> : null}
                </TableRow>
            ))}
        </TableBody>
    </Table>
);}

MapCloseFieldRangeTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    variable: state.app.closeField.map.selected.variable
})

const mapDispatchToProps = (dispatch, getState) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapCloseFieldRangeTable))
