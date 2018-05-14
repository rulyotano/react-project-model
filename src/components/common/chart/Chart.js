import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Chart extends Component{
    shouldComponentUpdate(nextProps, nextState){
        //needed for update the chart when the side bar collapse or open
        if (nextProps.isMaximized !== this.props.isMaximized){
            setTimeout(()=>this.chart.setSize(),200);            
        }
        return false;
    }
    localCallback(chart){
        this.chart=chart;
        if (this.callback)
            this.callback(chart);
    }
    render(){
        return <ReactHighcharts config={this.props.config||{}} callback={chart=>this.localCallback(chart)}/>
    }
}

Chart.propsTypes = {
    config: PropTypes.object,
    callback: PropTypes.func
}

Chart = connect((state)=>({    
    isMaximized: state.app._.maximized,
}))(Chart)


export default Chart;