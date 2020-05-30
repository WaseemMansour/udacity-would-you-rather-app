import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import {Card, Row, Col, Form } from 'react-bootstrap';
import { NEW_QUESTION } from '../actions/questions'
import { connect } from 'react-redux';


const NewQuestion = (props) => {
    const history = useHistory();
    
    const {authedUser, saveNewQuestion} = props
    const [validated, setValidated] = useState(0);
    const [optionOneValue, setOptionOne] = useState('')
    const [optionTwoValue, setOptionTwo] = useState('')

    const generateID = (length, chars) => {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    }

    const handleSaveQuestion = (e) => {
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          setValidated(1);
          const timestamp = + new Date()
          const ID = generateID(20, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
          const question = {
            id: ID,
            author: authedUser,
            timestamp,
            optionOne: {
              votes: [],
              text: optionOneValue,
            },
            optionTwo: {
              votes: [],
              text: optionTwoValue,
            } 
          }
          saveNewQuestion(question)
          history.push("/");
        }

        
    }

    return (
      <Card className="question-item mt-3 mb-3">
        <Card.Header className="text-center">Create New Question</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <p>Complete the question</p>
              <h5>Would you rather ...</h5>
              <form validated={validated} onSubmit={handleSaveQuestion}>
              <Form.Group as={Col} md="12" className="pr-0 pl-0" controlId="validationCustom01">
                <Form.Control
                  type="text" 
                  
                  onChange={(e)=> setOptionOne(e.target.value)} 
                  placeholder="Enter Option One Text Here"
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" className="pr-0 pl-0" controlId="validationCustom02">
                <Form.Control
                  type="text" 
                  
                  onChange={(e)=> setOptionTwo(e.target.value)} 
                  placeholder="Enter Option Two Text Here" 
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
{/*         
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    onChange={(e)=> setOptionOne(e.target.value)} 
                    placeholder="Enter Option One Text Here"
                    required
                  />
                  <p className="text-center mt-3">OR</p>
                  <input 
                    type="text" 
                    className="form-control" 
                    onChange={(e)=> setOptionTwo(e.target.value)} 
                    placeholder="Enter Option Two Text Here" 
                    required
                  />
                </div> */}
                <div className="form-group">
                    <button 
                      type="submit"
                      // onClick={(e)=> {
                      //   e.preventDefault();
                      //   const form = e.currentTarget;
                      //   if (form.checkValidity() === false) {
                      //     e.preventDefault();
                      //     e.stopPropagation();
                      //   }

                      //   setValidated(true);
                      //   handleSaveQuestion()
                      // }} 
                      className="btn btn-success btn-block"> Submit  </button>
                </div>
              </form>
              
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    saveNewQuestion: (q)=> dispatch({type: NEW_QUESTION, q})
  }
}

export default connect(null, mapDispatchToProps)(NewQuestion)