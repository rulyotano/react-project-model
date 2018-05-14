import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LanguagePicker from '../../common/_LanguagePicker';
import loginService from '../../../service/login/loginService';
import {AccountCircle, ExitToApp} from '@material-ui/icons';
import { withStyles, IconButton, Menu, MenuItem, Avatar, ListItemIcon, ListItemText} from '@material-ui/core';

import '../../../styles/css/header.css';


const styles = theme => ({
    avatar: {
      height: 30,
      width: 30,
      marginLeft: "9px",
      marginRight: "9px",
      backgroundColor: `${theme.palette.primary.light} !important`   
    },
    menuItem: {
       
    },
    primary: {},
    icon: {
        color: `${theme.palette.primary.light} !important`
    },      
  });

class Header extends Component{
    state = {
        anchorEl: null,
      };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render(){
        const {anchorEl} = this.state;
        const open = !!anchorEl;
        const {classes, userInfo} = this.props;
        const {t} = this.context;
        return(
            <div className="header">
                <div className="logo"></div>
                <div className="logo-text" style={{flex:1}}>Solinftec Analytic</div>
                <div className="header-item"><LanguagePicker showLabel={false} style={{}}/></div>
                <div>
                    <IconButton aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit">
                        <Avatar className={classes.avatar}>{userInfo.name.length ? userInfo.name[0] : '-'}</Avatar>
                    </IconButton>

                    <Menu id="menu-appbar" anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}>
                        <MenuItem className={classes.menuItem} onClick={this.handleClose}>
                            <ListItemIcon className={classes.icon}>                                
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText inset primary={userInfo.name}/>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} onClick={()=>loginService.logout()}>
                            <ListItemIcon className={classes.icon}>                                
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText inset primary={t("login.logout")}/>
                        </MenuItem>                        
                    </Menu>
                </div>               
            </div>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

Header.contextTypes = {
    t: PropTypes.func,
};


export default connect((state)=>({
    userInfo: state.user
}))(withStyles(styles)(Header));