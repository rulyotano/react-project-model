import React, {Component} from 'react';
import Segment from "../../common/segment/Segment";
import Chart from "../../common/chart/Chart";

const config = {
  chart:{style:{"width":"100%"}},
  title:{text:"Title"},
  subtitle:{text:"Sub-Title"},
  colors:["#1c6eff", "#ff692d"],

  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  yAxis:[
    {title: {text: 'Chuva mm'}},
    {title: {text: 'Temperatura ºC'}}
  ],
  tooltip:{
    shared:true
  },
  series: [
    {
      name:"Chuva",
      type:"column",
      data: [30.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4],
      tooltip:{valueSuffix:"(mm)"}
    },{
      name:"Temperatura",
      type:"line",
      data: [10,20,30,20,10,30,10,40,20,36,48,1],
      tooltip:{valueSuffix:"(ºC)"}
    }
  ]
};

class ChartTest extends Component{
  render(){
    return (
      <Segment title="Chart">
        <Chart config={config}/>
      </Segment>
    );
  }
}

export default ChartTest;