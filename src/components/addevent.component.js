import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "../components/navbar.component";




export default class AddEvent extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDirections = this.onChangeDirections.bind(this);
        this.onChangeMinPlayers = this.onChangeMinPlayers.bind(this);
        this.onChangeMaxPlayers = this.onChangeMaxPlayers.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            eventName: '',
            description: '',
            directions: '',
            minPlayers: 0,
            maxPlayers: 0,
            date: new Date(),
            idnum: -1
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/addevent/')
        .then(response => {
            var list = response.data;
            this.setState({idnum: list[list.length - 1].idnum + 1});
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
            numPlayers: 0,
            playerList: [],
            time: this.state.time,
            idnum: this.state.idnum
        }

        console.log(event);
        console.log(this.state);
        axios.post('http://localhost:5000/addevent/add', event)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

        alert("Good Work! You just created an event!");



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
                <h3>Add an Event</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <br></br>
                        <label>Event Name</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.eventName}
                            onChange={this.onChangeEventName}
                            />
                            <br></br>
                        <label>Description</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                            <br></br>
                        <label>Directions</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.directions}
                            onChange={this.onChangeDirections}
                            />
                            <br></br>
                        <label>Minimum Players (if this field does not matter leave at 0)</label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.minPlayers}
                            onChange={this.onChangeMinPlayers}
                            />
                            <br></br>
                        <label>Maximum Players (if this field does not matter leave at 0)</label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.maxPlayers}
                            onChange={this.onChangeMaxPlayers}
                            />
                            <br></br>
                        <label>Time</label>
                        <input type="time"
                            required
                            className="form-control"
                            value={this.state.time}
                            onChange={this.onChangeTime}
                            />
                            <br></br>
                        <label>Date</label>
                        <input type="Date"
                            required
                            className="form-control"
                            value={this.state.date}
                            onChange={this.onChangeDate}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add an Event to Picky Finder!" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}