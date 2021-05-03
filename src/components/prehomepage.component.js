import React, { Component } from 'react';
import axios from 'axios';
import NavbarFirst from "../components/navbarfirst.component";
import logo from '../PickyFinderLogo.png';



export default class PreHomePage extends Component {
    
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
                    window.location = '/loginfirst';
                    
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


    pressRegister(e){

        e.preventDefault();
        window.location = '/login'
    }

    pressLogin(e){

        e.preventDefault();
        window.location = '/loginfirst'
    }

    render() {
        return (
            <div>
                <NavbarFirst />
                <br></br>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img src="https://i.imgur.com/Z6zj9FE.png" alt="logo" width="200" height="200"/>
                    
                    
                </div>
                <br></br>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1>Welcome To Picky Finder!</h1>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h6>The best place to find your favorite pick-up games</h6>
                </div>
                <br></br>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h3>Please log in or register an account</h3>
                </div>
                <br></br>
                <form onSubmit={this.pressRegister}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <input type="submit" value="Register" className="btn btn-primary" />
                </div>
                </form>
                <br></br>
                <form onSubmit={this.pressLogin}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>
                </form>
            </div>
        )
    }
}