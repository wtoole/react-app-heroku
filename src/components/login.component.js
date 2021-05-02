import React, { Component } from 'react';
import axios from 'axios';




export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            email: '',
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



            for(var i = 0; i < response.data.length; i++){
                if(response.data[i].username == user.username){
                    this.setState({taken: true});
                }
            }

            if(this.state.taken){
                alert("Sorry, this username is already taken!")
            }else{

                this.setState({taken: false});

                for(i = 0; i < response.data.length; i++){
                    if(response.data[i].email == user.email){
                        this.setState({taken: true});
                    }
                }
                if(this.state.taken){
                    alert("Sorry, this email is already taken!")
                }else{
                    alert("Congrats "+ user.username+", you just created your acocunt!")
                    axios.post('http://localhost:5000/login/add', user)
                    .then(res => console.log(res.data));
                    
                }



            }

            console.log(this.state.taken);
            this.setState({taken: false});
        })
        .catch((error) => {
            console.log(error);
        })

        

        

        this.setState({
            username: '',
            password: '',
            email: ''
        })
    }




    render() {
        return (
            <div>
                <h3>Register Your Account</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                        <label>Password: (Min length of 5)</label>
                        <input type="password"
                            required
                            minLength="5"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                        <label>Email: </label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register for Picky Finder!" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}