import React, { Component } from 'react';
import axios from 'axios';

const Event = props => (
    <tr>
        <td>{props.event.eventName}</td>
        <td>{props.event.description}</td>
        <td>{props.event.directions}</td>
        <td>{props.event.minPlayers}</td>
        <td>{props.event.maxPlayers}</td>
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
                console.log(eventMonth);
                console.log(dnowMonth);

                
                if(eventYear < dnowYear){
                    list.splice(i,1);
                    i--;
                }else if(eventYear == dnowYear && eventMonth < dnowMonth){
                    console.log("Here 1");
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
        
            
            console.log(list);
            this.setState({ events: list});
        })
        .catch((error) => {
            console.log(error);
        })
    }

    eventList() {
        return this.state.events.map(currentevent => {
            return <Event event={currentevent} key={currentevent._id}/>
        })
    }



    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th>Directions</th>
                            <th>Min PLayers</th>
                            <th>Max PLayers</th>
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