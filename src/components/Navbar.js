import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby';
import logo from '../img/logo-wide.svg';
import bigLogo from '../img/big-logo.svg';
import classNames from 'classnames';
import './styles/navbar.scss';
import { useLocation } from '@reach/router';
import { NavLinks } from '../data/nav-links';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [whichHeader, setHeader] = useState(false);

  useScrollPosition(({currPos}) => {
    if (currPos.y !== 0) {
      setHeader(true);
    } else {
      setHeader(false);
    };
  }, [whichHeader], null, false, 500);

  const linksClass = classNames("ssp-default-header__links", {
    "ssp-default-header__links--large": !whichHeader,
  });

  const whichLogo = !whichHeader ? bigLogo : logo;
  const headerInner = classNames("ssp-default-header__inner", {
    "ssp-default-header__inner--large": !whichHeader,
  });
  console.log('which header', whichHeader);
  return (
    <nav className="ssp-default-header">
      <div className={headerInner}>
        <div className="ssp-default-header__logo">
          <img src={whichLogo}/>
        </div>
        <div className={linksClass}>
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
