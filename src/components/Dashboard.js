import React, { useState } from 'react';
import {Card, Nav } from 'react-bootstrap';
import QuestionsList from './QuestionsList';

// export default class Dashboard extends React.Component {
const Dashboard = (props) => {
  const qs = props.questions
  const users = props.users
  const authedUser = props.authedUser
  const [activeTab, setActiveTab] = useState("unanswered")
  

  const qsArr = Object.keys(qs).map(((k) => qs[k]))
  const tabChangeHandler = (tabNumber) => {
    setActiveTab(tabNumber)
  }

  return (    
    <Card>
      <Card.Header>
        <Nav className="justify-content-center" variant="pills" defaultActiveKey="#unanswered">
          <Nav.Item>
            <Nav.Link eventKey="#unanswered" onClick={()=> tabChangeHandler("unanswered")}>Unanswered Questions</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#answered" onClick={()=> tabChangeHandler("answered")}>Answered Questions</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <QuestionsList list={qsArr} users={users} currentList={activeTab} authedUser={authedUser} />
      </Card.Body>
    </Card>
  )
}

export default Dashboard