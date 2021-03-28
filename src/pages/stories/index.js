import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Layout from '../../components/Layout'
import PreviewCompatibleImage from '../../components/PreviewCompatibleImage.js'
import LeftSideBar from '../../components/LeftSideBar.js'

class BlogIndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const { currentPage, numPages } = this.props.pageContext
    console.log(this.props.pageContext)
    return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="content">
      <div className="columns is-multiline is-centered">
        <div className="column is-one-quarter is-hidden-touch">
          <LeftSideBar/>
        </div>
        <div className="column is-two-thirds ">

          <div className="columns is-multiline  is-two-thirds ">
            {posts &&
              posts.map(({ node: post }) => (
                <div className={`is-parent column is-half ${
                  post.frontmatter.featuredpost ? 'hidden' : ''
                }`} key={post.id}>

                  <article
                    className={`blog-list-item  is-child   `}
                  >
                    <header>
                      {post.frontmatter.featuredimage ? (
                      <Link to={post.fields.slug}>
                        <div className="featured-thumbnail roll-post">

                          <PreviewCompatibleImage
                            imageInfo={{
                              image: post.frontmatter.featuredimage,
                              alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                            }}
                          />
                        </div>
                        </Link>
                      ) : null}
                      <p className="post-meta">
                      <h4 >
                        {post.frontmatter.title}
                      </h4>
                        <span>  </span>
                        <span className="subtitle is-size-6 is-block">
                          {post.frontmatter.date}
                        </span>
                      </p>
                    </header>
                    <p>
                      {post.excerpt}
                      <br />
                      <br />
                    </p>
                  </article>

                </div>
              ))}
          </div>
        </div>
    </div>
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
       <ul className="pagination-list ">
        {Array.from({ length: numPages }, (_, i) => (
        <Link className={`pagination-link ${i+1 === currentPage ? "is-current" : ""}`} key={`pagination-number${i + 1}`} to={`/stories/${i === 0 ? "" : i + 1}`} >
          {i + 1}
        </Link>
        ))}
        </ul>
    </nav>

      </div>
    </div>
  </section>
      </Layout>
    )
  }
}

export default BlogIndexPage

export const blogIndexQuery = graphql`
  query blogIndexQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark (
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 400, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
