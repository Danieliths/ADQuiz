import React, { Component } from 'react';

import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import './NavMenu.css';
import { authenticationService, logout, isAdmin } from '../Helpers'

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            
            collapsed: true,
            currentUser: null,
            userIsAdmin: false
        };
    }
    componentDidMount() {
       
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
        authenticationService.userIsAdmin.subscribe(x => this.setState({ userIsAdmin: x }));
        this.setState({ userIsAdmin: isAdmin() })
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    
    render() {
        const { currentUser } = this.state;
        const { userIsAdmin } = this.state;
        return (
            
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">ADQuiz</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/highscore">Highscore</NavLink>
                                </NavItem>
                                {userIsAdmin &&
                                    <React.Fragment>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/addquestion">Add Question</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/showquestions">Show Questions</NavLink>
                                        </NavItem>
                                    </React.Fragment>
                                }
                                {currentUser &&
                                    <React.Fragment>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/quiz">Quiz</NavLink>
                                        </NavItem>
                                        <Link onClick={logout} to="/" className="text-dark nav-link">Logout</Link>
                                    </React.Fragment>
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
                                
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

}