import
    React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from 'material-ui-next/Input';
import { withStyles } from 'material-ui-next/styles';
import SelectWrappedComponent from "../select-wrapped/SelectWrappedComponent";
import {connect} from 'react-redux';

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

class FilterDropDownData extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: null
        }
    }
    componentWillMount(){
        let {targetKey} = this.props;
        this.props.load(targetKey);
    }
    handleChange = value =>{
        this.setState({
            value: value,
        });
        const valueNumber = parseInt(value,10);

        if(this.props.multi){
            let items= value.split(',').map(item=>parseInt(item,10));
            items = items.map(id=> this.props.data.find(item=>item[this.props.attrId] === id));
            this.props.onChange(items[0]? items:[]);

        }else {
            this.props.onChange(this.props.data.find(item => item[this.props.attrId] === valueNumber) || '');
        }


    };
    render(){
        const { id, placeHolder , multi, name, attrId, attrLabel} = this.props;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Input
                    fullWidth
                    inputComponent={SelectWrappedComponent}
                    value={this.state.value}
                    onChange={(value)=>{this.handleChange(value)}}
                    placeholder={placeHolder}
                    id={id}
                    inputProps={{
                        classes,
                        name:name,
                        instanceId: id,
                        simpleValue: true,
                        multi:!!multi,
                        options: this.props.data,
                        valueKey:attrId,
                        labelKey:attrLabel
                    }}
                />
            </div>
        );
    }
}
FilterDropDownData.propTypes = {
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    targetKey:PropTypes.string.isRequired,
    multi: PropTypes.bool,
    placeHolder:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    attrId:PropTypes.string.isRequired,
    attrLabel:PropTypes.string.isRequired
};
const mapStateToProps = (state,props) => {
    const {d} = state;
    const {targetKey} = props;

    return {
        data:d[targetKey].data?d[targetKey].data:[],
        isLoading:d[targetKey].loading
    };
};
const mapDispatchToProps = (dispatch) => ({
     load(targetKey){
         let {load} = require("../../../../_store/_data/actions/"+targetKey+"Actions").default;
         dispatch(load());
     }
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterDropDownData));


