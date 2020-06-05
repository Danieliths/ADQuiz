import React, { Component } from 'react';

import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import './NavMenu.css';
import { authenticationService, logout } from '../Helpers'

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            
            collapsed: true,
            currentUser: null,
        };
    }
    componentDidMount() {
       
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    
    render() {
        const { currentUser } = this.state;
        
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
                                
                                
                                {currentUser &&
                                    <Link onClick={logout} to="/" className="text-dark nav-link">Logout</Link>
                                }
                                {!currentUser &&
                                    <React.Fragment>
                                        <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                                        </NavItem>
                                        <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                                    </NavItem>
                                    </React.Fragment>
                                }
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/quiz">Quiz</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

}