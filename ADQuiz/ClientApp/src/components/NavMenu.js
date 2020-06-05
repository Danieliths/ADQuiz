import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { setCookie, getCookie, handleResponse } from '../Helpers'
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.loggedin = this.loggedin.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            collapsed: true,
            isLoggedin: false
        };
    }
    componentDidMount() {
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    
    render() {
        console.log("parentpropNavMenu = " + this.props.parentIsLoggedIn)
        {this.loggedin()}
        let contents = this.props.parentIsLoggedIn
            ? <button onClick={this.logout}>Logout</button>
            : <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
        return (
            
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">WebApplication5</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                                </NavItem>
                                <NavItem>
                                {contents}
                            </NavItem>
                            
                                <button onClick={this.loggedin}>TestLoggedin</button>
                            
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    //async login() {
    //    const loginResponse = await fetch('https://localhost:44325/login', {
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        },
    //        method: 'POST',
    //        credentials: 'include',
    //        body: JSON.stringify({ Email: "kidolizer@hotmail.com", Password: "Daniel123@" })
    //    });
    //    if (loginResponse.ok) {
    //        var XSRF = getCookie('XSRF-REQUEST-TOKEN');
    //        const apiResponse = await fetch('https://localhost:44325/api/weatherforecast', {
    //            headers: {
    //                'Accept': 'application/json',
    //                'Content-Type': 'application/json',
    //                'X-XSRF-TOKEN': XSRF
    //            },
    //            method: 'GET',
    //            credentials: 'include'
    //        });
    //        console.log(apiResponse.status);
    //        var body = await apiResponse.json();
    //        console.log(body);
    //        //this.setState({ apiResponse.body });
    //    }
    //}
    logout() {

    let XSRF = getCookie('XSRF-REQUEST-TOKEN');

    let fetchConfig = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': XSRF
        }
    };
    fetch("/logout", fetchConfig)
        .then(handleResponse)
        .then(() => {
            document.cookie.split(";")

                .forEach(function (c) {
                    document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });

            this.loggedin();
        })
        .catch(error => console.log(error));
}
    //logout() {
    //    const requestOptions = {
    //        method: 'GET',
    //        headers: { 'Content-Type': 'application/json' },
    //    };

    //    return fetch('/logout', requestOptions)
    //        .then(data => {
    //            console.log(data);
    //            if (data.ok) {
    //                this.setState({ isLoggedin: false })
    //            }
    //            return data;
    //        });
    //};
loggedin() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch('/loggedin', requestOptions)
        .then(data => {
            console.log(data);
            if (data.ok && this.props.parentIsLoggedIn ==false) {
                this.props.parentCallbackChangeLoggedin(true)
                //this.setState({ isLoggedin: this.props.parentIsLoggedIn })
            }
            else if (!data.ok && this.props.parentIsLoggedIn == true){
                this.props.parentCallbackChangeLoggedin(false)
                //this.setState({ isLoggedin: this.props.parentIsLoggedIn })
            }
            console.log("är parent inloggad? " + this.props.parentIsLoggedIn + "är barnet inloggad? " + this.state.isLoggedin)
            return data;
        });
};
}