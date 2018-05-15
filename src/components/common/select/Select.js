import React, {PureComponent} from 'react';
import {Select as SelectMui} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {withStyles} from '@material-ui/core';
import componentToReduxForm from "../../../service/redux-form/componentToReduxForm";
import propTypes from 'prop-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const styles = {
    fullWidth: {
        width:'100%'
    }
}

class Select extends PureComponent{

    constructor(props){
        super(props);
        this.state ={
            value:''
        }
    }
    static contextTypes={
        t: propTypes.func
    };
    static propTypes={
        id: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
        label: propTypes.string.isRequired,
        attrId: propTypes.string.isRequired,
        attrLabel: propTypes.string,
        error: propTypes.bool,  //if has error
        helperText: propTypes.string,  //text error
        suggestions:propTypes.arrayOf(propTypes.object).isRequired,
    };

    handleChange = event => {
        let {suggestions, attrId} = this.props;

        const value = event.target.value;
        this.setState({ value });

        // let filtered = suggestions.find(i=>i[this.props.attrId] === event.target.value);
        this.props.onChange(value);
    };


    render(){
        const { classes, suggestions, name, id, label, attrId="id", attrLabel="label",
                error = false, helperText = "" } = this.props;
        const {t} = this.context;
        return(
            <FormControl className={classes.fullWidth} error={error}>
                <InputLabel htmlFor={id}>{t(label)}</InputLabel>
                <SelectMui className={classes.fullWidth}
                    value={this.state.value}
                    autoWidth={true}
                    MenuProps={MenuProps}
                    input={<Input id={id} name={name} onChange={e=>this.handleChange(e)}/>}>
                     {/* inputProps={{
                         onChange:this.handleChange,
                         name,
                         id
                     }}> */}
                    <MenuItem value="">
                        <em>{t('None')}</em>
                    </MenuItem>
                    {suggestions.map(m=><MenuItem value={m[attrId]} key={m[attrId]}>{m[attrLabel]}</MenuItem>)}
                </SelectMui>                
                {error ? <FormHelperText>{helperText}</FormHelperText> : null}
            </FormControl>
        )
    }
}

Select = withStyles(styles)(Select);

export const SelectRF = componentToReduxForm(Select);
export default Select;