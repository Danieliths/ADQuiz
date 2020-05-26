import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true,
        loggedin: ""
    };
  }
    
  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
    componentDidMount() {
        this.timer = setInterval(() => this.getItems(), 1000);
    }

    componentWillUnmount() {
        this.timer = null; // here...
    }

    getItems() {
        fetch("/loggedin")
            .then(response => response.status)
            .then(body => this.setState({ loggedin: body }));
    }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">ADQuiz</NavbarBrand>
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
                    <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                            </NavItem>
                            if (this.state.loggedin == "200") {
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/login">BAJS</NavLink>
                                </NavItem>
                            }
                            
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
