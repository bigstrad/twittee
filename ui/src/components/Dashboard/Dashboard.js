import React, { useState, useEffect, useContext } from 'react';
import Logo from '../Logo.js';
import { Route, NavLink } from 'react-router-dom';
import { GlobalContext } from '../Context';

// components
import Home from '../Home/Home.js';
import MakeTee from '../MakeTee/MakeTee';
import Contact from '../Contact/Contact';
import Cart from '../Payment/Cart';
import Thanks from '../Payment/Thanks';
import Git from '../Git/Git';

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

const Dashboard = () => {

  // context
  const global = useContext(GlobalContext);

  // destructure from global context
  const { selectedItems } = global;
  const cartItems = (selectedItems.length > 0 ? selectedItems.length : 0);
  // state
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  }

  const toggleClose = () => {
    setOpen(false);
  }

  // // lifecycle
  // useEffect(() => {
  //   console.log('Dashboard ADD selectedItems'); // TODO remove
  //   addSelected([{ 'xx': 'xx' }]); // TODO remove
  // }, []);

  // lifecycle
  useEffect(() => {
    // console.log('Dashboard selectedItems', selectedItems); // TODO remove
  }, [global]);

  return (
    <>
      <Navbar color="faded" light expand="md">
        <NavLink exact to="/" className="navbar-brand"><Logo onClick={toggleClose} /></NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink exact to="/maketee" className="nav-link" onClick={toggleClose}>Design My Twit-Tee!</NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/cart" className="nav-link" onClick={toggleClose}>
                Cart Items: {cartItems}
              </NavLink>
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
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/thanks/:receiptUrl" component={Thanks} />
        <Route exact path="/git" component={Git} />
      </div>
    </>
  );
}

export default Dashboard;