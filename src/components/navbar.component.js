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
                <Link to="/" className="navbar-brand">ExcerTracker</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Exercises</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create Exercise Log</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Create User</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/login" className="nav-link">Register Account</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/loginfirst" className="nav-link">Log In</Link>
                    </li>
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