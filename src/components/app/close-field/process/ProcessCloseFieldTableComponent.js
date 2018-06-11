import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DataTable from '../../../common/data-table/DataTable';

const styles = theme => ({

})

class ProcessCloseFieldTable extends PureComponent{
    static contextTypes = {
        t: PropTypes.func,
    }
    static propTypes = {
        classes: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired,
        onSelectionChange: PropTypes.func
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
        const {onSelectionChange} = this.props;
        if (onSelectionChange !== undefined)
            onSelectionChange(selection);
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

export default withStyles(styles)(ProcessCloseFieldTable);