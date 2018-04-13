import React, { Component }  from 'react'
import { withRouter } from 'react-router-dom'
import '../../styles/css/login.css';
import TextField from 'material-ui/TextField';
import Button from 'material-ui-next/Button';
import loginService from "../../service/login/loginService";

const style = {
    input:{color:'white', height:'80%', marginLeft:'4px', marginTop:'4px'},
    hint: {color:'white', height:'50%', marginLeft:'4px', marginTop:'12px'},
    floatingLabel:{top:'5px'},
    btnAcessar:{backgroundColor:'inherited', height:'45px', borderRadius:'5px'}
};

class Login extends Component {
    state = { username:'', password:'' }
    login(){
        loginService.login(this.state.username, this.state.password)
                    .then(()=>this.props.history.push('/'));
    }
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
                                        inputStyle={style.input}
                                        hintStyle={style.hint}
                                        floatingLabelStyle={style.floatingLabel}
                                        onChange={(event, newValue)=>{this.setState({username:newValue})}}
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
                                        inputStyle={style.input}
                                        hintStyle={style.hint}
                                        floatingLabelStyle={style.floatingLabel}
                                        onChange={(event, newValue)=>{this.setState({password:newValue})}}
                                    />
                                </section>
                            </div>
                            <div style={{textAlign:'center', paddingTop:'30px'}}>
                                <Button
                                    variant="raised"
                                    color="primary"
                                    buttonStyle={{ height:'45px', backgroundColor:'#0774b4', borderRadius:'5px', width:'100%'}}
                                    style={style.btnAcessar}
                                    onClick={()=>this.login()}
                                >ACESSAR
                                </Button>
                            </div>

                        </fieldset>
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(Login);