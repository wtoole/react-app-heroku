import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "../components/navbar.component";
import { isCompositeComponent } from 'react-dom/test-utils';




export default class EditEvent extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDirections = this.onChangeDirections.bind(this);
        this.onChangeMinPlayers = this.onChangeMinPlayers.bind(this);
        this.onChangeMaxPlayers = this.onChangeMaxPlayers.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeYourName = this.onChangeYourName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            eventName: '',
            description: '',
            directions: '',
            minPlayers: 0,
            maxPlayers: 0,
            numPlayers: 0,
            date: new Date(),
            idnum: -1,
            playerList: [],
            yourName: ''
        }
    }

    componentDidMount() {

        console.log(this.state.yourName);

        axios.get('http://localhost:5000/addevent/')
        .then(response => {
            var list = response.data;
            this.setState({idnum: list[list.length - 1].idnum + 1});
            var str = String(this.props.location.pathname);
            str = str.substring(6,30);
            for(var i = 0; i<list.length; i++){
                if(list[i]._id == str){
                    this.setState({numPlayers: list[i].numPlayers,
                                    eventName: list[i].eventName,
                                    description: list[i].description,
                                    directions: list[i].directions,
                                    minPlayers: list[i].minPlayers,
                                    maxPlayers: list[i].maxPlayers,
                                    date: list[i].date,
                                    idnum: list[i].idnum,
                                    time: list[i].time,
                                    playerList: list[i].playerList
                                    });
                }
            }

        })
        .catch((error) => {
            console.log(error);
        })
    }

    onChangeEventName(e) {
        this.setState({
            eventName: e.target.value
        });
    }

    onChangeYourName(e) {
        this.setState({
            yourName: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDirections(e) {
        this.setState({
            directions: e.target.value
        });
    }

    onChangeMinPlayers(e) {
        this.setState({
            minPlayers: e.target.value
        });
    }

    onChangeMaxPlayers(e) {
        this.setState({
            maxPlayers: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onChangeTime(e) {
        this.setState({
            time: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const event = {
            eventName: this.state.eventName,
            description: this.state.description,
            directions: this.state.directions,
            minPlayers: this.state.minPlayers,
            maxPlayers: this.state.maxPlayers,
            date: this.state.date,
            numPlayers: this.state.numPlayers + 1,
            playerList: this.state.playerList,
            time: this.state.time,
            idnum: 0
        }

        console.log(this.state.yourName);
        event.playerList.push(this.state.yourName);
        event.playerList.push(', ');

        console.log(event);
        var str = String(this.props.location.pathname);
        str = str.substring(6,30);
        console.log(str);
        var idd = str;

        

        axios.post('http://localhost:5000/addevent/update/'+idd, event)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

        alert("Good Work! You just joined the event!");



        this.setState({
            eventName: '',
            description: '',
            directions: '',
            minPlayers: 0,
            maxPlayers: 0,
            date: new Date(),
            time: '00:00'
        })

        window.location = '/pickyfinderhome'
    }




    render() {
        return (
            <div>
                <Navbar />
                 <br></br>
                <h3>Join Event</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <br></br>
                        <label>If you would like to join the <b>{this.state.eventName}</b> event with the following details: <b>{this.state.description}</b></label>
                        <br></br>
                        <p>Just enter your name below and press the button to join the game!</p>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.yourName}
                            onChange={this.onChangeYourName}
                            />
                         
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Join The Game!" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}