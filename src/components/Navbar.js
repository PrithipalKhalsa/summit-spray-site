import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo-wide.svg'
// import logoBig from '../img/logo-wide.svg'
import classNames from 'classnames';
import './styles/navbar.scss';

const Navbar = (props) => {

  // const [active, setActive] = useState(false);
  // const [navBarActiveClass, setClass] = useState('');

  return (
    <nav className="ssp-default-header">
      <div className="ssp-default-header__inner">
        <div className="ssp-default-header__logo">
          <img src={logo}/>
        </div>
        <div className="ssp-default-header__links">
          <Link className="ssp-default-header__links__item" activeClassName="active-nav" to="/stories">
            Latest Stories
          </Link>
          <Link className="ssp-default-header__links__item" activeClassName="active-nav" to="/news">
            News
          </Link>
          <Link className="ssp-default-header__links__item" activeClassName="active-nav" to="/climbing">
            Climbing
          </Link>
          <Link className="ssp-default-header__links__item"  activeClassName="active-nav" to="/lifestyle">
            Lifestyle
          </Link>
          <Link className="ssp-default-header__links__item"  activeClassName="active-nav" to="/ski">
            Ski
          </Link>
          <Link className="ssp-default-header__links__item" activeClassName="active-nav" to="/about">
            About
          </Link>
          <Link className="ssp-default-header__links__item" activeClassName="active-nav" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
