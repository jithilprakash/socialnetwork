import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import "./layoutstyles.css";

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <>
      <Nav className='mr-auto'>
        <Nav.Link>
          <Link to='/posts'>Posts</Link>
        </Nav.Link>
        <Nav.Link>
          {" "}
          <Link to='/profiles'>Developers</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to='/dashboard'>
            <i className='fas fa-user'> </i>
            <span className='hide-sm'> Dashboard</span>
          </Link>
        </Nav.Link>
      </Nav>
      <Nav.Link>
        <a href='/' onClick={logout}>
          <i className='fas fa-sign-out-alt'> </i>
          <span className='hide-sm'>Logout</span>
        </a>
      </Nav.Link>
    </>
  );

  const guestLinks = (
    <>
      <Nav className='mr-auto'>
        <Nav.Link>
          <Link to='/posts'>Posts</Link>
        </Nav.Link>
        <Nav.Link>
          {" "}
          <Link to='/profiles'>Developers</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to='/register'>Register</Link>
        </Nav.Link>
      </Nav>
      <Nav.Link>
        <i class='fa fa-sign-in' aria-hidden='true' />
        <Link to='/login'>Login</Link>
      </Nav.Link>
    </>
  );
  return (
    <Navbar fixed='top' bg='dark' expand='lg'>
      <Navbar.Brand href='#home'>
        <Link to='/'>
          <i className='fas fa-inbox' /> SimpleTerms
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
        {/* <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-success'>Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.prototypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
