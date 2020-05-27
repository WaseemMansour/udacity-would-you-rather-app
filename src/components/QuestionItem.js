import React from 'react';
import {Card, Row, Col, Form } from 'react-bootstrap';

export default (props) => {
  const { username } = props
  const imgSrc = username === 'Sarah' ? "https://tylermcginnis.com/would-you-rather/sarah.jpg" : "https://tylermcginnis.com/would-you-rather/tyler.jpg"
  return (
    <Card className="question-item">
      <Card.Header>
        {username} asks:
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs="4" className="right-separator">
          <img className="user-img" src={imgSrc} width="100px" alt="" /> 
          </Col>
          <Col xs="8">
            <h2>Would You Rather ...</h2>
            <Form>
              {['answer1', 'answer2'].map((option, index) => (
                <div key={index} className="mb-3">
                  <Form.Check 
                    type="radio"
                    id={`selectedRadio`}
                    label={`${option}`}
                  />
                </div>
              ))}
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

