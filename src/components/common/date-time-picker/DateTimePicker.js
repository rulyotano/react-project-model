import React,{Component} from 'react';
import { withStyles } from 'material-ui-next/styles';
import TextField from 'material-ui-next/TextField';
import PropTypes from 'prop-types';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%',
    },
});


class DateTimePicker extends Component{
    onChange(e){
        if(e.target.value === "")
            this.props.onChange('isEmpty');
        else
            this.props.onChange(new Date(e.target.value));
    }

    render(){
        const { classes, id, label } = this.props;
        return(
            <TextField
                id={id}
                label={!label || label === '' ? 'Data/Hora': label}
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(value)=>{this.onChange(value)}}
            />
        )

    }
}

DateTimePicker.propTypes = {
    defaultValue:PropTypes.string,
    label:PropTypes.string,
    id:PropTypes.string.isRequired
};


export default withStyles(styles)(DateTimePicker);