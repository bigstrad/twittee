import React from 'react';
import Logo from '../Logo.js';
import { Route, NavLink } from 'react-router-dom';

// components
import Home from '../Home/Home.js';
import MakeTee from '../MakeTee/MakeTee.js';
import Contact from '../Contact/Contact.js';
import Git from '../Git/Git.js';

// layout
import {
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleClose = this.toggleClose.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleClose() {
    this.setState({
      isOpen: false
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">        
          <NavLink exact to="/" className="navbar-brand"><Logo onClick={this.toggleClose} /></NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink exact to="/maketee" className="nav-link" onClick={() => this.toggleClose()}>Design My Twit-Tee!</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink exact to="/contact" className="nav-link" onClick={() => this.toggleClose()}>Contact Us</NavLink>
              </NavItem> */}
            </Nav>
          </Collapse>
        </Navbar>
        <div className="container-fluid">
          <Route exact path="/" component={Home} />
          <Route exact path="/maketee" component={MakeTee} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/git" component={Git} />
        </div>
      </div>
    );
  }
}

export default Dashboard;