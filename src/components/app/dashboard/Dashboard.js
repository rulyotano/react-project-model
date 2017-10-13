import React, { Component}  from 'react'
import HttpService from '../../../service/http/HttpService';

class DashBoard extends Component {


    constructor() {
        super();
        this.state = {token:''};
    }

    componentDidMount() {
        let login = {"username": "thiago.tahara", "password": "1234"};
        console.log(HttpService.useSgpaApiUrl());
        HttpService.useSgpaApiUrl().post('/auth', login)
        .then(data =>
        {
           this.setState({'token':data.token});

        })
        .catch(error =>
        {
            alert(error);
        });
    };

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