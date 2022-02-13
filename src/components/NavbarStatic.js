import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo-wide.svg'
import bigLogo from '../img/big-logo.svg';
import classNames from 'classnames';
import './styles/navbar-static.scss';
import { useLocation } from '@reach/router';
import { NavLinks } from '../data/nav-links';

const NavbarStatic = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav className="ssp-static-header">
      <div className="ssp-static-header__inner">
        <div className="ssp-static-header__logo">
          <img src={bigLogo}/>
        </div>
        <div className="ssp-static-header__links">
          {
            NavLinks.map((link) => {
              const { url, title } = link;
              const navLinkClasses = classNames("ssp-static-header__links__item", {
                "ssp-static-header__links__item--active": pathname === url,
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

export default NavbarStatic
