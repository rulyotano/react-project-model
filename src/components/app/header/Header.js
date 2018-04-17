import React, {Component} from 'react';
import LanguagePicker from '../../common/_LanguagePicker';
import loginService from '../../../service/login/loginService';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';

import '../../../styles/css/header.css';

class Header extends Component{

    render(){
        return(
            <div className="header">
                <div className="logo"></div>
                <div className="logo-text" style={{flex:1}}>Solinftec Analytic</div>
                <div className="header-item"><LanguagePicker showLabel={false} style={{}}/></div>
                <IconButton
                  aria-haspopup="true"
                  onClick={()=>loginService.logout()}
                  color="inherit">
                    <ExitToApp />
                  </IconButton>
            </div>
        )
    }
}


export default Header;