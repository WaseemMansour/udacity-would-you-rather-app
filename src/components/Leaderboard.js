import React from 'react';
import {Card, Row, Col } from 'react-bootstrap';
import gold from '../gold-medal.png'
import silver from '../silver-medal.png'
import bronze from '../bronze-medal.png'

export default (props) => {
  const { users } = props
  const usersArr = Object.values(users)
  
  const newUsersArr = usersArr.map(user => {
    const userScore = Object.keys(user.answers).length + user.questions.length 
    return {
      ...user,
      userScore
    }
  })
  const sortedArr = newUsersArr.sort((a, b) => b.userScore - a.userScore)
  
  const awardsArr = [gold, silver, bronze]
  
  return (
    sortedArr.map((user, index) => (
    <Card key={user.id} className="question-item mt-3 mb-3">
      <Card.Body>
        <Row>
          <Col xs="3" className="right-separator">
          <div className="award">
            <img src={awardsArr[index]} alt="award" />
          </div>
          <img className="user-img" src={user.avatarURL} width="100px" alt="" /> 
          </Col>
          <Col xs="6" className="right-separator user-stats">
            <h4 className="mb-3">{user.name}</h4>
            <div className="questions-stats mb-2">
              <div>Answered questions</div>
              <div>{Object.keys(user.answers).length}</div>
            </div>
            <div className="questions-stats mb-2">
              <div>Created questions</div>
              <div>{user.questions.length}</div>
            </div>
          </Col>
          <Col xs="3" className="text-center">
            <Card.Header>Score</Card.Header>
            <Card.Body className="text-center">
              <span className="user-score">{user.userScore}</span>
            </Card.Body>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    ))
    
  )
  
}
