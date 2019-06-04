import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

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
    height: "20px"
  }
});

class ReadTableComponent extends PureComponent {
    static propTypes = {
      variable: PropTypes.any,
      selectedRangeGroup: PropTypes.object,
      t: PropTypes.func.isRequired,
      onBodyClick: PropTypes.func
    }

    render(){
      const {variable, classes, selectedRangeGroup, t, onBodyClick = ()=>null} = this.props;
      if (!variable)
        return null;
      const rw = variable.rangeView;
      let key = 0;
      const rowClasses = {root: classes.tableRow};
      return (<Table className={classes.table}>
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
          </TableRow>
        </TableHead>
        <TableBody onClick={onBodyClick}>
          {selectedRangeGroup.ranges.map(item=>(
            <Row key={key++} rowClasses={rowClasses} tClasses={classes} 
              item={item} rangeView={rw}/>
          ))}
        </TableBody>
      </Table>);
    }
}

class Row extends PureComponent {
    static propTypes = {
      item: PropTypes.any.isRequired,
      rowClasses: PropTypes.any,
      tClasses: PropTypes.any,
      rangeView: PropTypes.any
    }

    render(){
      const { item, rowClasses, tClasses: classes, rangeView: rw} = this.props;
      return (<TableRow classes={rowClasses}>
        {rw.color ? <TableCell padding="checkbox"><div className={classes.color} style={{backgroundColor: item.color}}></div></TableCell> : null}
        {rw.min ? <TableCell padding="checkbox">{item.min}</TableCell> : null}
        {rw.min && rw.max ? <TableCell padding="checkbox">-</TableCell> : null}
        {rw.max ? <TableCell padding="checkbox">{item.max}</TableCell> : null}
        {rw.description ? <TableCell padding="checkbox">{item.description}</TableCell> : null}
        {rw.value ? <TableCell padding="checkbox">{item.value}</TableCell> : null}
        {rw.suffix ? <TableCell padding="checkbox">{item.suffix}</TableCell> : null}
        {rw.extra1 ? <TableCell padding="checkbox">{item.extra1}</TableCell> : null}
        {rw.extra2 ? <TableCell padding="checkbox">{item.extra2}</TableCell> : null}
      </TableRow>);
    }
}

export default withStyles(styles)(ReadTableComponent);
