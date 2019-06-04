import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ReactTable from "react-table";
import 'react-table/react-table.css';
import {isFunction} from 'lodash';
import Scrollbar from 'react-perfect-scrollbar';
import classNames from 'classnames';
import {TablePagination} from '@material-ui/core';
import moment from 'moment';

// import {Table, TableHead, TableRow, TableBody,
//     TableCell, TableFooter, TablePagination} from '@material-ui/core';

const styles = theme => ({  
  "@global":{
    ".rt-th:focus": {
      outline: "none"
    }
  },  
  table: {
    border:"1px solid #ddd",
    boxShadow:'1px 1px 2px 1px #ddd',
    minWidth: 1020,
    width: "calc(100% - 2px)"
  },
  tableWrapper:{
    height: '100%'
  },
  tableRow:{
    height:'48px !important',
    maxHeight:'48px !important'
  },
  selectedRow:{
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  },
  tHead:{
    height: "56px"
  },
  tHeadCell:{
    padding: "4px 56px 4px 24px !important",
    textAlign: "left",
    // borderBottom: "1px solid rgba(224, 224, 224, 1)",
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "0.75rem",
    fontWeight: "500",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  verticalMiddleContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  numberCell:{
    textAlign: "right !important"
  },
  tDataCell: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderSpacing: "0",
    borderCollapse: "collapse",
    padding: "4px 56px 4px 24px !important",
    fontSize: "0.8125rem",
    fontWeight: "400",
    textAlign: "left",
  },
  paginationSelect:{
    paddingRight: "22px"
  }
});

const CustomTablePagination = ({pages, page, pageSize, 
  previousText, nextText, onPageChange, onPageSizeChange,
  pageSizeOptions,
  count, t, classes })=> {
  return <TablePagination
    classes={{select: classes.paginationSelect}}
    component="div"
    count={count}
    rowsPerPage={pageSize}
    rowsPerPageOptions={pageSizeOptions}
    page={page}
    backIconButtonProps={{
      'aria-label': previousText,
    }}
    nextIconButtonProps={{
      'aria-label': nextText,
    }}
    onChangePage={(e, p)=>onPageChange(p)}
    onChangeRowsPerPage={(e)=>onPageSizeChange(1*e.target.value)}
    labelRowsPerPage={t('dataGrid.rowPerPage')}
    labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('dataGrid.of')} ${count}`}
  />;
};

const CustomTbodyComponent = (props)=><div {...props} className={classNames("rt-tbody", props.className || [])}><Scrollbar>{props.children}</Scrollbar></div>;

export const commonSortMethods = {
  number: (a, b)=>{
    return a - b;
  },
  moment: (a, b)=>{
    return (a || moment()).valueOf() - (b || moment()).valueOf();
  }
};

class DataTable extends PureComponent {
    static propTypes = {
      headerConfig: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        isNumeric: PropTypes.bool,
        key: PropTypes.string.isRequired
      })).isRequired,
      data: PropTypes.arrayOf(PropTypes.object),

      // row selection
      onSelectionChanged: PropTypes.func,
      multiSelect: PropTypes.bool,
      rowKey: PropTypes.any,
      showPagination: PropTypes.bool
    }

    static contextTypes = {
      t: PropTypes.func,
    }

    state = {
      selection: {}
    }

    // shouldComponentUpdate(props){
        
    // }

    _getRowKey(it){
      const {rowKey} = this.props;
      if (rowKey !== undefined)
        return it[rowKey];
      return it;
    }

    onRowClick(it){
      const {onSelectionChanged, multiSelect} = this.props;
      const {selection} = this.state;
      const key = this._getRowKey(it);

      let result = selection;
      // if is selected then un-select
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

    _columnsFromHeaderConfig(){
      return this.props.headerConfig.map(h=>({
        Header: h.content,
        accessor: h.key,
        isNumeric: h.isNumeric,
        sortMethod: h.sortMethod !== undefined ? h.sortMethod :
          h.isNumeric ? commonSortMethods.number : undefined
      }));
    }

    _texts(){
      const { t } = this.context;
      return {
        previousText: t("dataGrid.previous"),
        nextText: t("dataGrid.next"),
        loadingText: t("dataGrid.loading"),
        noDataText: t("dataGrid.noData"),
        pageText: t("dataGrid.page"),
        ofText: t("dataGrid.of"),
        rowsText: t("dataGrid.rows"),
      };
    }

    render(){
      const { selection } = this.state;
      const { classes, data=[], showPagination = true } = this.props;
      const { t } = this.context;
      const texts = this._texts();
      return <div className={classes.tableWrapper}>
        <ReactTable {...texts}
          style={{
            height: "100%"
          }}
          pageSize={!showPagination ? data.length : undefined}
          data={data}
          columns={this._columnsFromHeaderConfig()}
          className="-striped -highlight"
          showPagination={showPagination}
          getTheadProps={(state, rowInfo, column, instance)=>({
            className: classNames(classes.tHead)
          })}
          getTheadThProps={(state, rowInfo, column, instance)=>({
            className: classNames(classes.verticalMiddleContainer, 
              classes.tHeadCell, 
              column.isNumeric ? classes.numberCell : null)
          })}
          getTrProps={(state, rowInfo, column, instance)=>({
            className: classNames(classes.tableRow)
          })
          }
          getTdProps={(state, rowInfo, column, instance) => {
            if (!rowInfo)
              return {};
            const selected = !!selection[this._getRowKey(rowInfo.original)];
            return {
              onClick: (e, handleOriginal) => {
                this.onRowClick(rowInfo.original);
                if (handleOriginal) {
                  handleOriginal();
                }
              },
              className: classNames(selected ? classes.selectedRow : undefined,
                classes.verticalMiddleContainer, 
                classes.tDataCell,
                column.isNumeric ? classes.numberCell : null,                                
              )
            };
          }}
          TbodyComponent={CustomTbodyComponent}
          PaginationComponent={(props) => 
            <CustomTablePagination {...props} 
              classes={classes}
              count={data.length} 
              t={t}/>}
        />
      </div>;        
    }
}

export default withStyles(styles)(DataTable);