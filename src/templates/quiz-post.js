import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const QuizPostTemplate = ({
   content,
  contentComponent,
  description,
  tags,
  title,
  helmet,

}) => {
  const PostContent = contentComponent || Content


  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1 single-post story-body">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light ">
              {title}
            </h1>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>

              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

QuizPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const QuizPost = ({ data }) => {
  const { markdownRemark: post } = data
  console.log(post.frontmatter.featuredimage.childImageSharp.fluid.src)
  return (
    <Layout>
      <QuizPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Summit Spray News">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta

                property="og:image"
            content={`${post.frontmatter.featuredimage.childImageSharp.fluid.src}`}
            />
            <meta

                property="og:title"
            content={`${post.frontmatter.title}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

QuizPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}
export default QuizPost

export const pageQuery = graphql`
  query QuizPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {

        title
        description
      }
    }
  }
`
