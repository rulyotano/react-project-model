import React, { Component}  from 'react'
import loginService from '../../../service/login/loginService';
import loginAuthDataService from '../../../service/login/loginAuthDataService';

class DashBoard extends Component {


    constructor() {
        super();
        this.state = {token:''};
    }

    componentDidMount() {
        this.updateAuthData()

        let authData = loginAuthDataService.getAuthData()
        if (!authData || !authData.token){
            loginService.login("thiago.tahara", "1234")
            .then(data =>
            {
                this.updateAuthData()
            })
            .catch(error =>
            {
                alert(error);
            });
        }
    };

    updateAuthData(){
        let authData = loginAuthDataService.getAuthData()
        if (authData && authData.token){
            this.setState({'token':authData.token});
        }else{
            this.setState({'token': '-'});
        }
    }

    render() {
        return (
            <div>
                <h1>DashBoard</h1>
                <span>token: {this.state.token}</span>
            </div>
        );
    }
}


export default DashBoard;