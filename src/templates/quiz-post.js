import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const QuizPostTemplate = ({
  questions,
  answers,
  contentComponent,
  description,
  title,
  helmet,
  randomnumber,

}) => {
  const PostContent = contentComponent || Content
  const [didSubmit, setDidSumbit] = useState(false);


  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1 single-post story-body">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light ">
              {title}

            </h1>
            {description}
            {console.log(answers.length)}
            {console.log(answers)}
            <div className="question-section">
            {questions &&
              questions.map((ask) => (
              <div>
                <p>{ask.Question}</p>
                <form className="box" >
                  <div className="questions">
                    <input className="field" type="radio" id="op1" name="q1" />
                    <label >{ask.option1}</label>
                    </div>
                    <div className="questions">
                    <input className="field" type="radio" id="op2" name="q1" />
                    <label >{ask.option2}</label>
                    </div>
                    <div className="questions">
                    <input className="field" type="radio" id="op3" name="q1"/>
                    <label >{ask.option3}</label>
                    </div>
                    <div className="questions">
                    <input className="field" type="radio" id="op4" name="q1" />
                    <label >{ask.option4}</label>
                    </div>
                </form>
              </div>
              ))}
            </div>
            <div className="result-section">
             { didSubmit ?
               <div>{answers[randomnumber].body}</div>
             :
              <button onClick={()=>setDidSumbit(true)} >Submit</button>
             }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

QuizPostTemplate.propTypes = {
  questions: PropTypes.array,
  answers: PropTypes.array,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const QuizPost = ({ data }) => {
  const { markdownRemark: post } = data
  const randomnumber=Math.floor(Math.random() * post.frontmatter.answersbody.answers.length)
  // console.log(post.frontmatter.quizbody.questions)
  return (
    <Layout>
      <QuizPostTemplate
        questions={post.frontmatter.quizbody.questions}
        answers={post.frontmatter.answersbody.answers}
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
        title={post.frontmatter.title}
        randomnumber={randomnumber}
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
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
        quizbody {
          questions {
            Question
              option1
              option2
              option3
              option4

          }
        }

        answersbody {
          answers {
            body
          }
        }

      }
    }
  }
`
