import React, { Component}  from 'react'
import '../../styles/css/_custom.css';
import 'bootstrap-grid/dist/grid.min.css';
import TextField from 'material-ui/TextField';


class Login extends Component {
    state = {  }
    render() {
        return (
            <div>
                <div className="login">
                    <div className="login-header">
                        <div className="logo"></div>
                    </div>
                    <div className="login-body">
                        <fieldset>
                            <div className="login-field">

                                <section>
                                    <TextField
                                        className="text-username"
                                        floatingLabelText="Username"
                                        id="usernameID"
                                        name="username"
                                        fullWidth={true}
                                        inputStyle={{color:'white', height:'80%', marginLeft:'4px', marginTop:'4px'}}
                                        hintStyle={{color:'white', height:'50%', marginLeft:'4px', marginTop:'12px'}}
                                        floatingLabelStyle={{top:'5px'}}


                                    />
                                </section>


                            </div>
                            <div className="login-field">
                                <section>
                                    <TextField
                                        defaultValue=""
                                        className="text-password"
                                        floatingLabelText="Password"
                                        type="password"
                                        fullWidth={true}
                                        inputStyle={{color:'white', height:'80%', marginLeft:'4px', marginTop:'4px'}}
                                        hintStyle={{color:'white', height:'50%', marginLeft:'4px', marginTop:'12px'}}
                                        floatingLabelStyle={{top:'5px'}}
                                    />
                                </section>
                            </div>
                            <div className="row">
                                <div style={{marginLeft:'111px', marginTop:'42px'}}>
                                    <button type="button" className="btn-acessar">ACESSAR</button>
                                </div>
                            </div>

                        </fieldset>
                    </div>
                    {/*<div className="login-footer">*/}
                        {/*<div className="login-field">*/}

                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default Login;