import React, { Component } from 'react';
import axios from 'axios';




export default class LoginFirst extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            accounts: [],
            taken:false
        }
    }

    componentDidMount() {
        console.log(this.state.taken);
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }


        axios.get('http://localhost:5000/login/')
        .then(response => {
            this.setState({ accounts: response.data });
            console.log(response);
            console.log(response.data[0].username);


            var index = 0;

            for(var i = 0; i < response.data.length; i++){
                if(response.data[i].username == user.username){
                    this.setState({taken: true});
                    index = i;
                }
            }

            if(this.state.taken){
                alert("Good! this username is in the database");
                if(response.data[index].password == user.password){
                    alert("And the password matches!")
                }else{
                    alert("Sorry but the password does not match");
                }
            }else{
                alert("Sorry, but the usename is not in the database");
                this.setState({taken: false});

                


            }



            console.log(this.state.taken);
            this.setState({taken: false});
        })
        .catch((error) => {
            console.log(error);
        })

        

        

    }




    render() {
        return (
            <div>
                <h3>Login To Your Account</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                        <label>Password:</label>
                        <input type="password"
                            required
                            minLength="5"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login Picky Finder!" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}