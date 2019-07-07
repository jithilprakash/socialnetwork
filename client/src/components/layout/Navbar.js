import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "./layoutstyles.css";
import Header from "./Header";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'> </i>
          <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <a href='/' onClick={logout}>
          <i className='fas fa-sign-out-alt'> </i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    // <nav className='navbar bg-navbar'>
    //   <h1 className="nav-head">
    //     <Link to='/'>
    //       <i className='fas fa-inbox' /> SimpleTerms
    //     </Link>
    //   </h1>
      // {!loading && (
      //   <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      // )}
    // </nav>
    <Header />
  );
};

Navbar.prototypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
