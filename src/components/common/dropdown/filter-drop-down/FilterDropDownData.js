import
    React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FilterDropDown from "./FilterDropDown";
import {isEmpty} from "lodash";
import { CircularProgress } from 'material-ui-next/Progress';

import { withStyles } from 'material-ui-next/styles';

const styles = theme => ({
    progress: {
        positionAbsolute:true,
        marginTop: '10px',
        position:'absolute',
        right:'0'

    },
});

class FilterDropDownData extends PureComponent{
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
            <FilterDropDown placeHolder={placeHolder} suggestions={data} onChange={this.handleChange} {...otherProps}>
                {isLoading ? <CircularProgress className={classes.progress} size={40} />:''}
            </FilterDropDown>
        );
    }
}
FilterDropDownData.propTypes = {
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    targetKey:PropTypes.string.isRequired,
    placeHolder:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    attrId:PropTypes.string.isRequired,
    attrLabel:PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    label:PropTypes.string
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
         let {load} = require("../../../_store/_data/actions/"+targetKey+"Actions").default;
         dispatch(load());
     }
});

export default  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterDropDownData));


