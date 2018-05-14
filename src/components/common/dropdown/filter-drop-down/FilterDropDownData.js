import
    React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FilterDropDown from "./FilterDropDown";
import {isEmpty} from "lodash";
import { withStyles, CircularProgress } from '@material-ui/core';
import componentToReduxForm from './componentToReduxForm';

const styles = theme => ({
    progress: {
        positionAbsolute:true,
        marginTop: '10px',
        position:'absolute',
        right:'0'

    },
});

class FilterDropDownDataComponent extends PureComponent{
    static propTypes = {
        id:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired,
        targetKey:PropTypes.string.isRequired,
        placeHolder:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        attrId:PropTypes.string.isRequired,
        attrLabel:PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        isLoading: PropTypes.bool,
        label:PropTypes.string
    }
    constructor(props){
        super(props);
        this.state = {
            value: null
        }
    }
    componentWillMount(){
        let {targetKey, data, isLoading} = this.props;
        if (!isLoading && isEmpty(data))
            this.props.load(targetKey);
    }
    handleChange = value =>{
        this.props.onChange(value);
    };
    render(){
        const { data,  isLoading, placeHolder, classes, ...otherProps } = this.props;
        return (
            <FilterDropDown placeHolder={placeHolder} suggestions={data} onChange={this.handleChange} {...otherProps} isLoading={isLoading}>
                {isLoading ? <CircularProgress className={classes.progress} size={40} />:''}
            </FilterDropDown>
        );
    }
}

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
         let {load} = require("../../../_store/_data/actions/"+targetKey+"Actions").default;
         dispatch(load());
     }
});

FilterDropDownDataComponent = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterDropDownDataComponent));

export const FilterDropDownData = componentToReduxForm(FilterDropDownDataComponent);  //export redux form
export default FilterDropDownDataComponent; //export default without redux form