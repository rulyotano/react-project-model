import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { forEach, isNaN, head } from 'lodash';
import DataTable from '../../../common/data-table/DataTable';

// import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableFooter from '@material-ui/core/TableFooter';
// import TablePagination from '@material-ui/core/TablePagination';

const styles = theme => ({

})

class ProcessCloseFieldTable extends PureComponent{
    static contextTypes = {
        t: PropTypes.func,
    }
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }
    state = {
        rowIdSelected:null,
    }

    _getHeaderConfig(){
        const { t } = this.context;
        if (this.headerConfig === undefined){
            this.headerConfig = [
                { key: "process", content: t("Process") },
                { key: "operations", content: t("Operations") },
                { key: "fieldText", content: t("Field") },
                { key: "fieldArea", content: t("Field Area"), isNumeric: true },
                { key: "machineArea", content: t("Machine Area"), isNumeric: true },
                { key: "date", content: t("Dates") },
                { key: "state", content: t("State") },
            ]
        }
        return this.headerConfig;
    }

    _onItemSelectionChanged(selection){

    }

    render(){
        const { classes, data=[] } = this.props;
        const { t } = this.context;

        return(
            <DataTable headerConfig={this._getHeaderConfig()} 
                        data={data} 
                        rowKey={"key"}
                        onSelectionChanged={selection=>this._onItemSelectionChanged(selection)}/>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.app.closeField.process.data,
});

export default connect(mapStateToProps)(withStyles(styles)(ProcessCloseFieldTable));