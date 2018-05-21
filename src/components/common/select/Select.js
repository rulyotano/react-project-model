import React, {PureComponent} from 'react';
import {Select as SelectMui} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {withStyles, CircularProgress, TextField} from '@material-ui/core';
import componentToReduxForm from "../../../service/redux-form/componentToReduxForm";
import propTypes from 'prop-types';
import {Search} from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            transform: 'translate3d(0, 0, 0)',
        },
    },
};

const styles = {
    fullWidth: {
        width:'100%'
    },
    progress: {
        marginTop: '23px',
        position:'absolute',
        right:'50%'

    },
}

class Select extends PureComponent{

    constructor(props){
        super(props);
        this.state ={
            value:'',
            criterion:''
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
        joinIdLabel: propTypes.bool,
        isLoading: propTypes.bool,
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
    getDescription = item =>{
        const {attrId ="id", attrLabel="label", joinIdLabel = false} = this.props;
        return joinIdLabel ? item[attrId] + ' - ' + item[attrLabel]:item[attrLabel];
    };
    getFilteredItems = item =>{

        const {criterion} = this.state;
        if(criterion === "")
            return true;
        let textToMatch = this.getDescription(item).toLowerCase();
        return textToMatch.includes(criterion.toLowerCase());


    };


    render(){
        const { classes, suggestions, name, id, label, attrId="id",
                isLoading=false, error = false, helperText = "", hasSearchInput = false} = this.props;
        const {t} = this.context;

        return(
            <FormControl className={classes.fullWidth} error={error}>
                <InputLabel htmlFor={id}>{t(label)}</InputLabel>
                <SelectMui className={classes.fullWidth}
                           value={this.state.value}
                           MenuProps={MenuProps}
                           id={id}
                           input={<Input id={id} name={name} onChange={e=>this.handleChange(e)}/>}>
                    {hasSearchInput ? <MenuItem style={{marginTop: '-8px', paddingLeft: '4px'}}>
                        <TextField id="search"
                                   autoFocus={true}
                                   name="search-name"
                                   value={this.state.criterion}
                                   fullWidth={true}
                                   onChange={(event) => {
                                       this.setState({criterion: event.target.value})
                                   }}
                                   placeholder={t('Keep typing')}
                                   onClick={e => {
                                       e.stopPropagation()
                                   }}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <Search/>
                                           </InputAdornment>
                                       ),
                                   }}
                        />
                    </MenuItem>:
                        ''
                    }
                    <MenuItem value="">
                        <em>{t('None')}</em>
                    </MenuItem>
                    {suggestions
                        .filter(f=> this.getFilteredItems(f))
                        .map(m=><MenuItem value={m[attrId]} key={m[attrId]}>{this.getDescription(m)}</MenuItem>)}
                </SelectMui>
                {error ? <FormHelperText>{helperText}</FormHelperText> : null}
                {isLoading ? <CircularProgress className={classes.progress} size={20} />:''}
            </FormControl>

        )
    }
}

Select = withStyles(styles)(Select);

export const SelectRF = componentToReduxForm(Select);
export default Select;