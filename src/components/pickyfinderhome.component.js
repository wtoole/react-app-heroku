import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "../components/navbar.component";
import {Link} from 'react-router-dom'

const Event = props => (
    
    <tr>
        <td><Link to ={"/edit/"+props.event._id}>Join</Link></td>
        <td>{props.event.eventName}</td>
        <td>{props.event.description}</td>
        <td>{props.event.directions}</td>
        <td>{props.event.minPlayers}</td>
        <td>{props.event.maxPlayers}</td>
        <td>{props.event.numPlayers}</td>
        <td>{props.event.playerList}</td>
        <td>{props.event.time}</td>
        <td>{props.event.date.substring(0,10)}</td>
        
    </tr>
)



export default class EventList extends Component {
    constructor(props) {
        super(props);

        this.state = {events: []};
    }

    
  
 

    componentDidMount() {
        var list = [];
        var dnow = new Date(Date.now());
        var dnowYear = dnow.getFullYear();
        var dnowMonth = dnow.getMonth();
        var dnowDay = dnow.getDate();
        var eventYear = 0;
        var eventMonth = 0;
        var eventDay = 0;

        axios.get('http://localhost:5000/addevent/')
        .then(response => {
            this.setState({ events: response.data});
            list = response.data;
            dnowMonth++;
            list = list.sort((a,b) => {
                if(a.date < b.date) return -1;
                if(a.date > b.date) return 1;
                return 0;
            });
            for(var i=0; i<list.length; i++){
                eventYear = Number(list[i].date.substring(0,4));
                eventMonth = Number(list[i].date.substring(5,7));
                eventDay = Number(list[i].date.substring(8,10));
                

                
                if(eventYear < dnowYear){
                    list.splice(i,1);
                    i--;
                }else if(eventYear == dnowYear && eventMonth < dnowMonth){
                    list.splice(i,1);
                    i--;
                }else if(eventYear == dnowYear && eventMonth == dnowMonth && eventDay < dnowDay){
                    list.splice(i,1);
                    i--;
                }else{
                    
                }
                
          
                //if(dnow<list[i].date){
                //    list[i].minPlayers += 10;
               // }S
              
            }
        
            
            this.setState({ events: list});
            
        })
        .catch((error) => {
            console.log(error);
        })

        console.log(this.state.events);
    }

    eventList() {
        return this.state.events.map(currentevent => {
            return <Event event={currentevent} key={currentevent._id}/>
        })
    }

    alert(){
        var ID = prompt("Enter the ID of the game you will attend");
    }

    join(){
        var ID = prompt("Enter the ID of the game you will attend");
        var name = prompt("Enter your name");
        alert(name);
        const event = {
            eventName: "EDITtest",
            description: "test",
            directions: "test",
            minPlayers: 1,
            maxPlayers: 2,
            date: new Date(),
            numPlayers: 0,
            playerList: [],
            time: "00:00",
            idnum: 199
        }

        axios.post('http://localhost:5000/addevent/update/101')
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        axios.post('http://localhost:5000/addevent/add', event)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

        window.location = '/pickyfinderhome'
    }

   

    

    render() {
        return (
          
            <div>
                 <Navbar />
                 <br></br>
                <h3>Available Pick-up games </h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th></th>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th>Directions</th>
                            <th>Min PLayers</th>
                            <th>Max PLayers</th>
                            <th>Current Number of Players</th>
                            <th>Current Players</th>
                            <th>Time</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        { this.eventList() }
                    </tbody>
                </table>
            </div>
        )
    }
}