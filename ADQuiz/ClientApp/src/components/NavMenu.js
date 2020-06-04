import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { setCookie, getCookie } from '../Helpers'
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isLoggedin: false
        };
        this.loggedin = this.loggedin.bind(this);
    }
    componentDidMount() {
        //this.login();
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    
    render() {
        let contents = this.state.loggedin
            ? <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
            : <button onClick={this.logout}>Logout</button>
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

    async login() {
        const loginResponse = await fetch('https://localhost:44325/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ Email: "kidolizer@hotmail.com", Password: "Daniel123@" })
        });
        if (loginResponse.ok) {
            var XSRF = getCookie('XSRF-REQUEST-TOKEN');
            const apiResponse = await fetch('https://localhost:44325/api/weatherforecast', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': XSRF
                },
                method: 'GET',
                credentials: 'include'
            });
            console.log(apiResponse.status);
            var body = await apiResponse.json();
            console.log(body);
            //this.setState({ apiResponse.body });
        }
    }
    logout() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        return fetch('/logout', requestOptions)
            .then(data => {
                console.log(data);
                if (data.ok) {
                    this.setState({ isLoggedin: false })
                }
                return data;
            });
    };
loggedin() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch('/loggedin', requestOptions)
        .then(data => {
            console.log(data);
            if (data.status.) {
                this.setState({ isLoggedin: true})
            }
            else {
                this.setState({ isLoggedin:false})
            }
            return data;
        });
};
}