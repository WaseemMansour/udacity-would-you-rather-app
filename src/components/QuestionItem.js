import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import {Card, Row, Col, Form, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ADD_ANSWER_TO_QUESTION } from '../actions/questions'
import { UPDATE_USER_ANSWERS } from '../actions/users'

const QuestionItem = (props) => {
  const { author, authedUser, singleView, handleSaveAnswer, handleUpdateUser } = props
  const { id, optionOne, optionTwo } = props.data
  let { answered } = props
  const allVotes = optionOne.votes.concat(optionTwo.votes)
  const userAlreadyAnswered = allVotes.indexOf(authedUser) !== -1
  if (userAlreadyAnswered) answered = true


  const totalVotes = optionOne.votes.length + optionTwo.votes.length
  const optionOnePercentage = optionOne.votes.length !== 0 ? parseFloat(optionOne.votes.length / totalVotes * 100).toFixed(1) : 0
  const optionTwoPercentage = optionTwo.votes.length !== 0 ?  parseFloat(optionTwo.votes.length / totalVotes * 100).toFixed(1) : 0

  
  const [selectedAnswer, setAnswer] = useState('')
  const [isAnswerSaved, savedAnswer] = useState(false)
  const [notValid, showValidation] = useState(false)
  
  const handleSelectAnswer = (e) => {

    e.preventDefault()
    if (selectedAnswer === '') {
      showValidation(true)
      return false;
    }
    showValidation(false)
    handleSaveAnswer(id, selectedAnswer, authedUser)
    handleUpdateUser(id, selectedAnswer, authedUser)
    savedAnswer(true)
  }

  return (
    <Card className="question-item mt-3 mb-3">
      <Card.Header>
        { 
          !answered || !isAnswerSaved ?
          `${author.name} asks:`
        :
          `Asked by ${author.name}`
        }
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs="4" className="right-separator">
          <img className="user-img" src={author.avatarURL} width="100px" alt="" /> 
          </Col>
          <Col xs="8">
            {
              answered || isAnswerSaved ?
            <Fragment>
              <h4>Results:</h4>

              <div className={`answered-box mb-3 p-3 ${optionOne.votes.indexOf(authedUser) !== -1 ? 'your-vote' : ''}`}>
                <span>Would you rather {optionOne.text}</span>
                <ProgressBar className="mt-3" variant="success" now={optionOnePercentage} label={`${optionOnePercentage}%`} />
                <span>{optionOne.votes.length} out of {totalVotes} votes</span>
              </div>
              
              <div className={`answered-box mb-3 p-3 ${optionTwo.votes.indexOf(authedUser) !== -1 ? 'your-vote' : ''}`}>
                <span>Would you rather {optionTwo.text}</span>
                <ProgressBar className="mt-3" variant="success" now={optionTwoPercentage} label={`${optionTwoPercentage}%`} />
                <span>{optionTwo.votes.length} out of {totalVotes} votes</span>
              </div>
            </Fragment>
            :
            <Fragment>
              <h4>Would You Rather ...</h4>
              {
                !singleView ?
                <Fragment>
                {optionOne.text} or ...
                  <Link 
                    className="btn btn-info btn-block mt-3"
                    to={{
                        pathname: `/questions/${id}`,
                    }}>
                    View Poll
                  </Link>
                </Fragment>
                :
                <Fragment>
                  <Form className="answer-form">
                    {[optionOne.text, optionTwo.text].map((option, index) => {
                      
                      return (
                      <div key={index} className={index === 0 ? 'mt-3 mb-2' : 'mt-2 mb-5'}>
                        <Form.Check 
                          required
                          type="radio"
                          id={`selectedRadio-${index}-${author}`}
                          label={`${option}`}
                          name={`selectedRadioAnswer-${author}`}
                          onChange={()=> setAnswer(index === 0 ? `optionOne` : `optionTwo`)}
                        />
                      </div>
                      )
                      }
                    )}
                    <div className="radio-validation">{notValid ? 'Please select option' : ''}</div>
                    <button
                      onClick={handleSelectAnswer} 
                      className="btn btn-success btn-block"> Submit
                    </button>

                  </Form>
                </Fragment>
              }
              
              
            </Fragment>
            }
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    handleSaveAnswer: (qID, answer, authedUser)=> dispatch({type: ADD_ANSWER_TO_QUESTION, qID, answer, authedUser}),
    handleUpdateUser: (qID, answer, authedUser)=> dispatch({type: UPDATE_USER_ANSWERS, qID, answer, authedUser})
  }
}

export default connect(null, mapDispatchToProps)(QuestionItem)