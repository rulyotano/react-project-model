import React, {Component} from 'react';
import DateTimeRangeSelector from "../date-time-range-selector/DateTimeRangeSelector";



class DateTimeRangeSelectorTest extends Component{

    render(){
        return(
            <DateTimeRangeSelector useAs={this.props.useAs} labelInitial="Inicial" labelFinal="Final" onChange={(interval)=>{console.log(interval)}}/>
        )
    }
}

export default DateTimeRangeSelectorTest;