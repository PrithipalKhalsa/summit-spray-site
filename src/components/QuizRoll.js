import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class QuizRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline ">
        {posts &&
          posts.map(({ node: post }) => (
            <div className={`is-parent column is-half`} key={post.id}>

              <article
                className={`blog-list-item  is-child   `}
              >
                <header>
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
                  <p className="post-meta">
                  <Link to={post.fields.slug}>
                    <h4 >
                      {post.frontmatter.title}
                    </h4>
                  </Link>
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
    )
  }
}

QuizRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query QuizRollQuery{
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "quiz-post" } } }
          limit: 7
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
    render={(data, count) => <QuizRoll  data={data} count={count} />}
  />
)
