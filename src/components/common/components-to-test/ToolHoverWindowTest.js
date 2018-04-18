import React, {Component} from 'react';
import ToolHoverWindow from "../tool-hover-window/ToolHoverWindow";


class ToolHoverWindowTest extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ToolHoverWindow isOpen={false} labelHeader="Mapa do Tempo"/>
        )
    }

}

export default ToolHoverWindowTest;