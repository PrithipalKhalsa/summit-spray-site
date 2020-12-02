import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo-wide.png'
import logoBig from '../img/big-logo.png'

const Navbar = class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {

    return (

      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
      <div className="big-logo">  <Link to="/" title="Logo"><img src={logoBig} alt="summit-spray-big"/></Link></div>
        <div className="container">
          <div className="navbar-brand">

            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" activeClassName="active-nav" to="/stories">
                Latest Stories
              </Link>
              <Link className="navbar-item" activeClassName="active-nav" to="/tags/news">
                News
              </Link>
              <Link className="navbar-item" activeClassName="active-nav" to="/tags/climbing">
                Climbing
              </Link>
              <Link className="navbar-item"  activeClassName="active-nav" to="/tags/lifestyle">
                Lifestyle
              </Link>
              <Link className="navbar-item" activeClassName="active-nav" to="/about">
                About
              </Link>
              <Link className="navbar-item" activeClassName="active-nav" to="/contact">
                Contact
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              <a
                className="navbar-item"
                href="https://github.com/netlify-templates/gatsby-starter-netlify-cms"
                target="_blank"
                rel="noopener noreferrer"
              >
              </a>
            </div>
          </div>
        </div>
      </nav>

    )
  }
}

export default Navbar
