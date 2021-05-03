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
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            eventName: '',
            description: '',
            directions: '',
            minPlayers: 0,
            maxPlayers: 0,
            date: new Date()
        }
    }

    componentDidMount() {
        
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

    onSubmit(e) {
        e.preventDefault();

        const event = {
            eventName: this.state.eventName,
            description: this.state.description,
            directions: this.state.directions,
            minPlayers: this.state.minPlayers,
            maxPlayers: this.state.maxPlayers,
            date: this.state.date
        }


        axios.post('http://localhost:5000/addevent/add', event)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

        console.log(event);


       // axios.post('http://localhost:5000/addevent/add/')
        //.then(response => {
        //    console.log(response);


       // })
       // .catch((error) => {
         //   console.log(error);
        //})

        this.setState({
            eventName: '',
            description: '',
            directions: '',
            minPlayers: 0,
            maxPlayers: 0,
            date: new Date()
        })


    }




    render() {
        return (
            <div>
                <Navbar />
                 <br></br>
                <h3>Add an Event</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Event Name</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.eventName}
                            onChange={this.onChangeEventName}
                            />
                        <label>Description</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                        <label>Directions</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.directions}
                            onChange={this.onChangeDirections}
                            />
                        <label>Minimum Players</label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.minPlayers}
                            onChange={this.onChangeMinPlayers}
                            />
                        <label>Maximum Players</label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.maxPlayers}
                            onChange={this.onChangeMaxPlayers}
                            />
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