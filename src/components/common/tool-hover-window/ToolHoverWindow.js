import React, {Component} from 'react';
import PropTypes from 'prop-types'
import "../../../styles/css/tool-hover-window.css";
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Draggable from 'react-draggable';
import Scrollbar from 'perfect-scrollbar-react';
import 'perfect-scrollbar-react/dist/style.min.css';
let nextId = 0;

class ToolHoverWindow extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:props.isOpen === undefined? true:props.isOpen,
            labelHeader:props.labelHeader,
            width:props.width?props.width:'320px'
        };
    }
    
    handleState(){
        let {isOpen} = this.state;
        this.setState({isOpen:!isOpen});
    }

    render(){

        let {labelHeader, isOpen, width} = this.state;
        let height = isOpen? 'calc(95% - 100px)':'calc(95% - calc(95% - 100px) - 64px)';
        let MaxHeight = 'calc(95% - 10px)';
        return(
            <Draggable>
                <div className="tool-hover-window" style={{width:width, height: height}}>
                    <header>
                        <h5>{labelHeader}</h5>
                        {isOpen?<ArrowUp onClick={()=>{this.handleState()}}/>:<ArrowDown onClick={()=>{this.handleState()}}/>}
                    </header>
                    <div className="tool-hover-window-content" style={{ maxHeight:MaxHeight}}>
                        <Scrollbar>
                            <div style={{width:'95%'}}>
                                {this.props.children}
                            </div>
                        </Scrollbar>

                    </div>
                </div>

            </Draggable>
        )
    }
}
ToolHoverWindow.propTypes = {
    isOpen: PropTypes.bool,
    labelHeader:PropTypes.string.isRequired,
    width:PropTypes.string

};

export default ToolHoverWindow;