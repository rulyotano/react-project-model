import React, {PureComponent} from "react";
import "../../../../styles/css/date-time-range-selector.css";
import PropTypes from 'prop-types';
import moment from 'moment';
import DateTimePicker from '../date-time';

class DateTimeRangeSelector extends PureComponent{
    static propTypes = {
      useAs:PropTypes.oneOf(["h", "v"]),
      labelInitial:PropTypes.string,
      labelFinal:PropTypes.string,
      onChange: PropTypes.func.isRequired,
      timeFormat: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      initialValue: PropTypes.shape({
        initialDateTime: PropTypes.object,
        finalDateTime: PropTypes.object
      })
    }

    static contextTypes = {
      t: PropTypes.func.isRequired
    }

    constructor(props){
      super(props);

      const initialDateTime = (props.initialValue && props.initialValue.initialDateTime) || moment().startOf("day").toDate();
      const finalDateTime = (props.initialValue && props.initialValue.finalDateTime) || moment().endOf("day").toDate();
      this.state = {
        initialDateTime,
        finalDateTime
      };
    }

    componentDidMount(){
      const {initialDateTime, finalDateTime} = this.state;
      this.props.onChange({initialDateTime, finalDateTime});
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
      const {initialDateTime, finalDateTime} = this.state;
      const stateValue = {initialDateTime, finalDateTime};
      const {useAs, labelInitial, labelFinal, value=stateValue,
        timeFormat} = this.props;
      const {t} = this.context;
      let className = 'date-time-range-selector-';
      className+= useAs || 'h';
      return(
        <div className={className}>
          <div className="date-time-box left">
            <DateTimePicker id="date-time-left" 
              label={labelInitial || t('dates.Initial Date')} 
              onChange={(e)=>this.onInitialChange(e)}
              value={value.initialDateTime}
              timeFormat={timeFormat}/>
          </div>
          <div className="date-time-box right">
            <DateTimePicker id="date-time-right" 
              label={labelFinal || t('dates.Final Date')} 
              onChange={(e)=>this.onFinalChange(e)}                        
              value={value.finalDateTime}
              timeFormat={timeFormat}/>
          </div>
        </div>
      );
    }
}

export default DateTimeRangeSelector;