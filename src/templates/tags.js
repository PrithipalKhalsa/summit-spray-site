import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import LeftSideBar from '../components/LeftSideBar'

class TagRoute extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
        <div className="columns is-multiline  is-centered">
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


        </div>
      </div>
    </section>
        </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
