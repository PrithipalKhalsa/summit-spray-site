import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class LeftSideBar extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="column left-side-bar-inner">
      <h5>Unclimbed Corner</h5>
        {posts &&
          posts.map(({ node: post }) => (
            <div className={`is-parent column is-full ${
              post.frontmatter.featuredpost ? 'hidden' : ''
            }`} key={post.id}>

              <article>
                <div className="">
                  {post.frontmatter.featuredimage ? (
                  <Link to={post.fields.slug} className=" is-half">
                    <div >

                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                    </Link>
                  ) : null}
                  <p className="">
                    {post.frontmatter.title}
                  </p>
                </div>
              </article>

            </div>
          ))}
      </div>
    )
  }
}

LeftSideBar.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query LeftSideBarQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { tags: { in: ["Ski","Surf"] } } }
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
    render={(data, count) => <LeftSideBar data={data} count={count} />}
  />
)
