import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo-wide.png'
import logoBig from '../img/big-logo.png'
import classNames from 'classnames';

const Navbar = (props) => {

  const [active, setActive] = useState(false);
  const [navBarActiveClass, setClass] = useState('');


  // toggleHamburger = () => {
  // }
  return (
    <nav
      className="ssp-navbar"
      role="navigation"
      aria-label="main-navigation"
    >
      <div>
        <div className="big-logo">  <Link to="/" title="Logo">
          <img src={logoBig}    alt="summit-spray-big"/></Link>
        </div>
        <div className="container">
          <div className="navbar-brand">
              {/* Hamburger menu */}
              <div
                className={`navbar-burger burger ${navBarActiveClass}`}
                data-target="navMenu"
                onClick={() => toggleHamburger()}
              >
                <span />
                <span />
                <span />
              </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${navBarActiveClass}`}
          >
            <div className="navbar-start">
              <Link className="navbar-item" activeClassName="active-nav"to="/    stories">
                Latest Stories
              </Link>
              <Link className="navbar-item" activeClassName="active-nav" to="/ news">
                News
              </Link>
              <Link className="navbar-item" activeClassName="active-nav"to="/    climbing">
                Climbing
              </Link>
              <Link className="navbar-item"  activeClassName="active-nav"to="/   lifestyle">
                Lifestyle
              </Link>
              <Link className="navbar-item"  activeClassName="active-nav" to="/ski">
                Ski
              </Link>
              <Link className="navbar-item" activeClassName="active-nav"to="/    about">
                About
              </Link>
              <Link className="navbar-item" activeClassName="active-nav"to="/    contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
