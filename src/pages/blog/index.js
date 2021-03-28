import React from 'react'

import Layout from '../../components/Layout'
import { Link } from 'gatsby'
import BlogRoll from '../../components/BlogRoll'
import LeftSideBar from '../../components/LeftSideBar'

export default class BlogIndexPage extends React.Component {

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
          <div className="columns is-12 is-multiline is-centered">

            <div className="column is-one-quarter is-hidden-touch">
              <LeftSideBar/>
            </div>

            <div className="column is-two-thirds  ">
                <BlogRoll />
            </div>



        </div>
          </div>

        </section>
      </Layout>
    )
  }
}
