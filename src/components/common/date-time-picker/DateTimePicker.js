import React,{PureComponent} from 'react';
import { withStyles, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import {isDate} from 'lodash';
import moment from 'moment';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%',
    },
});


class DateTimePicker extends PureComponent{
    static propTypes = {
        value:PropTypes.object,
        label:PropTypes.string,
        id:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired
    }

    state = {
        value: ""
    }
    onChange(e){
        let value = e.target.value;
        if(value === "")
            this.props.onChange(null);
        else{
            this.props.onChange(new Date(value));
        }
        this.setState({ value });
    }

    render(){
        const { classes, id, label, value = this.state.value } = this.props;
        let fValue = value;
        if (isDate(fValue))
            fValue = moment(fValue).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
        return(
            <TextField
                id={id}
                label={!label || label === '' ? 'Data/Hora': label}
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                value={fValue}
                onChange={(e)=>{this.onChange(e)}}
            />
        )

    }
}

export default withStyles(styles)(DateTimePicker);