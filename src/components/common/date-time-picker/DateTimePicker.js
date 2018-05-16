import React,{PureComponent} from 'react';
import { withStyles, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import {isDate} from 'lodash';
import moment from 'moment';
import {isString, debounce} from 'lodash';
import TetheredDateTime from './TetheredDateTime';

import Datetime from "react-datetime";

import "../../../styles/css/react-datetime.css"
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
    dOnChange = debounce(this.onChange, 300)
    onChange(mDate){
        let value = isString(mDate) ? null : mDate.toDate();
        this.props.onChange(value);
        this.setState({ value });
    }

    render(){
        const { classes, id, label, value = this.state.value } = this.props;
        let fValue = value;
        if (!isDate(fValue))
            fValue = moment(fValue).toDate()
        return(

            <TetheredDateTime
                closeOnSelect={true}
                onChange={v=>this.dOnChange(v)}                
                value={fValue}
                input={true}
                label={label}
                inputProps={{
                    id
                }}
            />
        )

    }
}

export default withStyles(styles)(DateTimePicker);