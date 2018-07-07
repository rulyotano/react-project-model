import React, { PureComponent } from 'react'
import {Dialog, DialogTitle, DialogActions, withStyles } from '@material-ui/core'
import DialogContent from '@material-ui/core/DialogContent'
// import PropTypes from 'prop-types';
import componentByType from '../componentByType';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        background:'linear-gradient( to bottom, #fff 92%, #ddd 100%)'
    },
    content: {
        paddingTop:'15px',
        // backgroundColor:'#f5f5f5',


    },
    footer:{
        background:'linear-gradient( to top, #fff 88%, #ddd 100%)',
        margin:'0',
        padding:'8px'
    }
});
const Header = ()=>null;
const Body = ()=>null;
const Footer = ()=>null;

class DialogComponent extends PureComponent {
    static propTypes = {
    }    
    renderHeader(){
        const { classes, children } = this.props;
        const cHeader = componentByType(children, Header);
        if (!cHeader) {
            return null;
        }
        return (<DialogTitle className={classes.heading} id="edit-legend-modal">{cHeader.props.children}</DialogTitle>);      
    }    
    renderBody(){
        const { classes, children } = this.props;
        const cBody = componentByType(children, Body);
        if (!cBody) {
            return null;
        }
        return (<DialogContent className={classes.content}>{cBody.props.children}</DialogContent>);      
    }
    renderFooter(){
        const { classes, children } = this.props;
        const cFooter = componentByType(children, Footer);
        if (!cFooter) {
            return null;
        }
        return (<DialogActions className={classes.footer}>{cFooter.props.children}</DialogActions>);      
    }
    render() {
        const {classes, ...other} = this.props;
        return (
        <Dialog {...other}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
        </Dialog>)
  }
}
DialogComponent.Header = Header
DialogComponent.Body = Body
DialogComponent.Footer = Footer

export default withStyles(styles)(DialogComponent)
