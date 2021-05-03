import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavbarFirst extends Component {
    constructor() {
        super();

        this.state = {
            user: 'USERNAME'
        }
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/login" className="navbar-brand">Picky Finder</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/login" className="nav-link">Register Account</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/loginfirst" className="nav-link">Log In</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
} 