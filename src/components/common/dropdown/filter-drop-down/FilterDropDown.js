import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withStyles, TextField} from '@material-ui/core';

import SelectWrappedComponent from "./select-wrapped/SelectWrappedComponent";
import componentToReduxForm from "./componentToReduxForm";

const ITEM_HEIGHT = 60;
const styles = theme => ({
    root: {
        flexGrow: 1

    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    // We had to use a lot of global selectors in order to style react-select.
    // We are waiting on https://github.com/JedWatson/react-select/issues/1679
    // to provide a much better implementation.
    // Also, we had to reset the default style injected by the library.
    '@global': {
        '.Select-control': {
            display: 'flex',
            alignItems: 'center',
            border: 0,
            height: 'auto',
            background: 'transparent',
            '&:hover': {
                boxShadow: 'none',
            },
        },
        '.Select-multi-value-wrapper': {
            flexGrow: 1,
            display: 'flex',
            flexWrap: 'wrap',
        },
        '.Select--multi .Select-input': {
            margin: 0,
        },
        '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
            padding: 0,
        },
        '.Select-noresults': {
            padding: theme.spacing.unit * 2,
        },
        '.Select-input': {
            display: 'inline-flex !important',
            padding: 0,
            height: 'auto',
        },
        '.Select-input input': {
            background: 'transparent',
            border: 0,
            padding: 0,
            cursor: 'default',
            display: 'inline-block',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            margin: 0,
            outline: 0,
        },
        '.Select-placeholder, .Select--single .Select-value': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.pxToRem(16),
            padding: 0,
        },
        '.Select-placeholder': {
            opacity: 0.42,
            color: theme.palette.common.black,
        },
        '.Select-menu-outer': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            position: 'absolute',
            left: 0,
            top: `calc(100% + ${theme.spacing.unit}px)`,
            width: '100%',
            zIndex: 2,
            maxHeight: ITEM_HEIGHT * 4.5,
        },
        '.Select.is-focused:not(.is-open) > .Select-control': {
            boxShadow: 'none',
        },
        '.Select-menu': {
            maxHeight: ITEM_HEIGHT * 4.5,
            overflowY: 'auto',
        },
        '.Select-menu div': {
            boxSizing: 'content-box',
        },
        '.Select-arrow-zone, .Select-clear-zone': {
            color: theme.palette.action.active,
            cursor: 'pointer',
            height: 21,
            width: 21,
            zIndex: 1,
        },
        // Only for screen readers. We can't use display none.
        '.Select-aria-only': {
            position: 'absolute',
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            height: 1,
            width: 1,
            margin: -1,
        },
    },
});

class FilterDropDownComponent extends PureComponent{
    static propTypes = {
        id:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        suggestions:PropTypes.arrayOf(PropTypes.object).isRequired,
        multi: PropTypes.bool,
        placeHolder:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        attrId:PropTypes.string.isRequired,
        attrLabel:PropTypes.string.isRequired,
        label:PropTypes.string,
        isLoading: PropTypes.bool
    }
    constructor(props){
        super(props);
        this.state = {
            value: null
        }
    }
    handleChange = value =>{
        this.setState({
            value: value,
        });

        if(this.props.multi){
            let items = value.split(',').map(id=> this.props.suggestions.find(item=>item[this.props.attrId] === id));
            this.props.onChange(items[0]? items:[]);

        }else {
            this.props.onChange(this.props.suggestions.find(item => item[this.props.attrId] === value) || '');
        }


    };
    render(){
        const { id, placeHolder , suggestions, multi, label, 
            name, attrId, attrLabel, classes, isLoading} = this.props;
        return (
            <div className={classes.root}>
                {this.props.children}
                <TextField
                    fullWidth
                    value={ this.state.value}
                    onChange={(value)=>{this.handleChange(value)}}
                    placeholder={placeHolder}
                    name={name}
                    label={label}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputComponent:SelectWrappedComponent,
                        inputProps:{
                            classes,
                            id:id,
                            instanceId: id,
                            simpleValue: true,
                            multi:!!multi,
                            options: suggestions,
                            valueKey:attrId,
                            labelKey:attrLabel,
                            isLoading
                        },
                    }}
                />

            </div>
        );
    }
}

FilterDropDownComponent = withStyles(styles)(FilterDropDownComponent);

export const FilterDropDown = componentToReduxForm(FilterDropDownComponent);  //export redux form
export default FilterDropDownComponent; //export default without redux form



