import React, { Component}  from 'react'
import '../../styles/css/_custom.css';
import 'bootstrap-grid/dist/grid.min.css';
import TextField from 'material-ui/TextField';


class Login extends Component {
    state = {  }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className="login-container">
                                <div className="login-header">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="logo"></div>
                                        </div>
                                        <div className="col-md-4">
                                            <h1 className="title">
                                                Solinftec
                                                <sub style={{fontSize: '50%', position: 'absolute', right: '-20px', bottom: '-15px'}}>SGPA</sub>
                                            </h1>

                                        </div>

                                    </div>
                                </div>
                                <div className="login-body">
                                    <fieldset>
                                        <section>
                                            <TextField
                                                hintText="Username"
                                                floatingLabelText="Username"
                                                id="usernameID"
                                                name="username"
                                                fullWidth={true}
                                                inputStyle={{color:'white'}}
                                                hintStyle={{color:'white'}}

                                            />
                                        </section>
                                        <section>
                                            <TextField
                                                hintText="Password Field"
                                                floatingLabelText="Password"
                                                type="password"
                                                fullWidth={true}
                                                inputStyle={{color:'white'}}
                                                hintStyle={{color:'white'}}
                                                style={{color:'white'}}
                                                labelColor={{color:'white'}}


                                            />
                                        </section>

                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Login;