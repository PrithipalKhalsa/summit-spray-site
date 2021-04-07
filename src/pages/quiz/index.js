import React from 'react'
import Layout from '../../components/Layout'
import { Link } from 'gatsby'
import QuizRoll from '../../components/QuizRoll'
import LeftSideBar from '../../components/LeftSideBar'

const QuizPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <div className="container">
      <div className="columns is-12 is-multiline is-centered">
        <h2>Quiz</h2>
        <div className="column is-one-quarter is-hidden-touch">
          <LeftSideBar/>
        </div>

        <div className="column is-two-thirds  ">
            <QuizRoll />
        </div>



    </div>
      </div>

    </section>
  </Layout>
)

export default QuizPage

export const quizPageQuery = graphql`
  query QuizQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
