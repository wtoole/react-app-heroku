import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            user: 'USERNAME'
        }
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                     <li className="navbar-item">
                     <a href="/pickyfinderhome"><img src="https://i.imgur.com/Z6zj9FE.png" alt="logo" width="40" height="40"/></a>
                    </li>
                    <li className="navbar-item">
                        <Link to="/pickyfinderhome" className="nav-link">Picky Finder Home Page</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/addevent" className="nav-link">Add Event</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/prehomepage" className="nav-link">Logout</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}