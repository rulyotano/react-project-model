import React, { Component}  from 'react'
import '../../styles/css/login.css';

class Login extends Component {
    state = {  }
    render() {
        return (
            <div>
                <form className="login-container" name="login_form" noValidate>
                    <header className="login-header">
                        <div className="logo"></div>
                        <h1 style={{marginLeft:'200px', width:'150px',fontSize: '30px', display:'inline', verticalAlign: 'middle', position: 'relative', color: '#fff'}}>
                            Solinftec
                            <sub style={{fontSize: '50%', position: 'absolute', right: '-20px', bottom: '-5px'}}>SGPA</sub>
                        </h1>
                    </header>
                    <fieldset>

                    </fieldset>
                    <footer className="login-footer"></footer>
                </form>
            </div>
        );
    }
}

export default Login;