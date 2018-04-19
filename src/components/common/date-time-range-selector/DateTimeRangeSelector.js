import React, {Component} from "react";
import "../../../styles/css/date-time-range-selector.css";
import DateTimePicker from '../date-time-picker/DateTimePicker';
import PropTypes from 'prop-types';

class DateTimeRangeSelector extends Component{
    constructor(props){
        super(props);

        this.state = {
            initialDateTime:props.initialDateTime?props.initialDateTime:'',
            finalDateTime:props.finalDateTime?props.finalDateTime:''
        }
    }
    onInitialChange(initialDateTime){
        this.setState({initialDateTime});
        this.props.onChange({initialDateTime, finalDateTime:this.state.finalDateTime});
    }
    onFinalChange(finalDateTime){
        this.setState({finalDateTime});
        this.props.onChange({initialDateTime:this.state.initialDateTime,finalDateTime});
    }


    render(){
        const {useAs, labelInitial, labelFinal} = this.props;
        let className = 'date-time-range-selector-';
        className+= useAs?useAs:'h';
        return(
            <div className={className}>
                <div className="date-time-box left">
                    <DateTimePicker id="date-time-left" label={labelInitial?labelInitial:'Data inicial'} onChange={(e)=>this.onInitialChange(e)}/>
                </div>
                <div className="date-time-box right">
                    <DateTimePicker id="date-time-right" label={labelFinal?labelFinal:'Data final'} onChange={(e)=>this.onFinalChange(e)}/>
                </div>
            </div>
        )
    }
}

DateTimeRangeSelector.propTypes = {
    useAs:PropTypes.string,
    labelInitial:PropTypes.string,
    labelFinal:PropTypes.string
};
export default DateTimeRangeSelector;