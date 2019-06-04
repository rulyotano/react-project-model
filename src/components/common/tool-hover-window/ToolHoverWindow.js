import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "../../../styles/css/tool-hover-window.css";
import {withStyles} from '@material-ui/core';
import {ArrowDropDown, ArrowDropUp} from '@material-ui/icons';
import Draggable from 'react-draggable';
import Scrollbar from 'react-perfect-scrollbar';
import classNames from 'classnames';

const styles = theme =>({
  "@global":{
    ".scrollbar-wrapper":{
      height: "100%"
    }
  },
  container: {
    position: "relative"
  },
  footer: {
    bottom: '0',
    position: 'absolute'
  },
  bodyContainer: {
    position: "relative"
  },
  scrollBarContainer: {
    width: '100%',
    position: "relative"
  },
  contentContainer: {
    padding: "5px"
  }
});

class ToolHoverWindow extends Component{
    static propTypes = {
      isOpen: PropTypes.bool,
      labelHeader:PropTypes.string.isRequired,
      width:PropTypes.string,
      footer:PropTypes.element,
      footerHeight:PropTypes.string
    }

    constructor(props){
      super(props);
      this.state={
        isOpen:props.isOpen === undefined? true:props.isOpen,
        labelHeader:props.labelHeader,
        width:props.width?props.width:'320px'
      };
    }
    
    handleState(){
      const {isOpen} = this.state;
      this.setState({isOpen:!isOpen});
    }

    stopPropagation(e){
      e.stopPropagation();
    }

    render(){

      const {labelHeader, isOpen, width} = this.state;
      const {classes, footer, footerHeight = "50px"} = this.props;
      const hasFooter = !!footer;
      const height = isOpen? 'calc(95% - 100px)':'36px';
      const MaxHeight = 'calc(100% - 36px)';
      const scrollHeight = hasFooter ? `calc(100% - ${footerHeight})` : "100%";
      const footerElement = hasFooter ? <div className={classes.footer} style={{width:'100%' ,height:footerHeight}}>
        {footer}
      </div> : null;
      return(
        <Draggable>
          <div className={classNames("tool-hover-window", classes.container)} 
            style={{width, height, zIndex:'10'}}>
            <header>
              <h5>{labelHeader}</h5>
              {isOpen?<ArrowDropUp onClick={()=>{this.handleState();}}/>:<ArrowDropDown onClick={()=>{this.handleState();}}/>}
            </header>
            <div className={classNames("tool-hover-window-content", classes.bodyContainer)} style={{ height:MaxHeight}}
              onMouseDown={e=>this.stopPropagation(e)}>
              <div className={classes.scrollBarContainer} style={{height: scrollHeight}}>
                <Scrollbar>
                  <div className={classes.contentContainer}>
                    {this.props.children}
                  </div>
                </Scrollbar>
              </div>                            
              {footerElement}
            </div>
          </div>

        </Draggable>
      );
    }
}

export default withStyles(styles)(ToolHoverWindow);