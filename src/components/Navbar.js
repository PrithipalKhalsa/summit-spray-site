import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo-wide.svg'
import classNames from 'classnames';
import './styles/navbar.scss';
import { useLocation } from '@reach/router';
import { NavLinks } from '../data/nav-links';

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  // console.log('TOP?', window.scrollY === 0);

  return (
    <nav className="ssp-default-header">
      <div className="ssp-default-header__inner">
        <div className="ssp-default-header__logo">
          <img src={logo}/>
        </div>
        <div className="ssp-default-header__links">
          {
            NavLinks.map((link) => {
              const { url, title } = link;
              const navLinkClasses = classNames("ssp-default-header__links__item", {
                "ssp-default-header__links__item--active": pathname === url,
              });
              return (
                <Link className={navLinkClasses} to={url}>
                  {title}
                </Link>
              )
            })
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
