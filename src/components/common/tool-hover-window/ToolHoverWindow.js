import React, {Component} from 'react';
import PropTypes from 'prop-types'
import "../../../styles/css/tool-hover-window.css";
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import {dragElement} from './handleFunctions';
let nextId = 0;

class ToolHoverWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:props.isOpen === undefined? true:props.isOpen,
            labelHeader:props.labelHeader,
            width:props.width?props.width:'320px'
        };
        this.toolHooverRef = React.createRef();
    }
    componentDidMount(){
        dragElement(this.toolHooverRef.current);
    }

    handleState(){
        let {isOpen} = this.state;
        this.setState({isOpen:!isOpen});
    }

    render(){

        let {labelHeader, isOpen, width} = this.state;
        return(
            <div className="tool-hover-window" ref={this.toolHooverRef} id={"tool-hover-window"+nextId++} style={{width:width, height: isOpen? 'calc(95% - 100px)':'calc(95% - calc(95% - 100px) - 64px)'}} draggable={true}>
                <header>
                    <h5>{labelHeader}</h5>
                    {isOpen?<ArrowUp onClick={()=>{this.handleState()}}/>:<ArrowDown onClick={()=>{this.handleState()}}/>}
                </header>
            </div>
        )
    }
}
ToolHoverWindow.propTypes = {
    isOpen: PropTypes.bool,
    labelHeader:PropTypes.string.isRequired,
    width:PropTypes.string

};

export default ToolHoverWindow;