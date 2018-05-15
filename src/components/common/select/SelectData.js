import
    React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from "./Select";
import {isEmpty} from "lodash";
import { withStyles, CircularProgress } from '@material-ui/core';
import componentToReduxForm from "../../../service/redux-form/componentToReduxForm";

const styles = theme => ({
    progress: {
        positionAbsolute:true,
        marginTop: '10px',
        position:'absolute',
        right:'0'

    },
});

class SelectDataComponent extends PureComponent{
    static propTypes = {
        id:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired,
        targetKey:PropTypes.string.isRequired,
        attrId:PropTypes.string.isRequired,
        attrLabel:PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        isLoading: PropTypes.bool,
        label:PropTypes.string
    };
    constructor(props){
        super(props);
        const {attrId} = props;

        this.state = {
            [attrId]:null
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
        const { data,  isLoading, classes, ...otherProps } = this.props;
        return (
            <Select suggestions={data} onChange={this.handleChange} {...otherProps}>
                {isLoading ? <CircularProgress className={classes.progress} size={40} />:''}
            </Select>
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
        let {load} = require("../../_store/_data/actions/"+targetKey+"Actions").default;
        dispatch(load());
    }
});

SelectDataComponent = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SelectDataComponent));

export const SelectDataRF = componentToReduxForm(SelectDataComponent);  //export redux form
export default SelectDataComponent; //export default without redux form