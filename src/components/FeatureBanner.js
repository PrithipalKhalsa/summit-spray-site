import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class FeatureBanner extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="feature-banner">
        {posts &&
          posts.map(({ node: post }) => (
            <div>{ post.frontmatter.featuredpost ?
          <div className="" key={post.id}>
              <article className="featured-article">
                <header>
                  {post.frontmatter.featuredimage ? (
                      <Link to={post.fields.slug}>
                    <div className="featured-thumbnail-featured">
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
                  <Link to={post.fields.slug}>
                  <h1 >
                    {post.frontmatter.title}
                  </h1>
                  </Link>
                    <span>  </span>
                    <span className="subtitle is-size-5 is-block">
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
            :
            null}</div>
          ))}
      </div>
    )
  }
}

FeatureBanner.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query FeatureBannerQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
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
    `}
    render={(data, count) => <FeatureBanner data={data} count={count} />}
  />
)
