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
                <Link to="/pickyfinderhome" className="navbar-brand">Picky Finder</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/pickyfinderhome" className="nav-link">Picky Finder Home Page</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/addevent" className="nav-link">Add Event</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}