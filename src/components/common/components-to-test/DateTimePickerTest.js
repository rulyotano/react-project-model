import React, {Component} from 'react';
import DateTimePicker from "../date-time-picker/DateTimePicker";


class DateTimePickerTest extends Component{

  render(){
    return(
      <DateTimePicker id="date-time-to-test" label="Date e Hora" onChange={(s)=>{console.log(s);}}/>
    );
  }
}


export default DateTimePickerTest;