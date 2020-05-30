import React, { Fragment } from 'react';
import QuestionItem from './QuestionItem';

export default (props) => {
  const { currentList, list, users, authedUser } = props
  const authedUserAnswers = Object.keys(users[authedUser].answers).map(k=>k);

  
  const qs = list.map(q => {
    return <QuestionItem key={q.id} data={q} user={users[q.author]} />
  });
  
  const answeredQs = list.filter(q=> authedUserAnswers.indexOf(q.id) !== -1)
  const unAnsweredQs = list.filter(q=> authedUserAnswers.indexOf(q.id) === -1)
  

  return (
    currentList === 'answered' ?
      <Fragment>
      { 
        answeredQs.length ?
          answeredQs.sort((a, b) => b.timestamp - a.timestamp).map(q => <QuestionItem key={q.id} data={q} authedUser={authedUser} author={users[q.author]} answered={true} /> )
        :
          'No answered questions to display.'
      }
      </Fragment>
    :
      <Fragment>
      {
        unAnsweredQs.length ?
          unAnsweredQs.sort((a, b) => b.timestamp - a.timestamp).map(q => <QuestionItem key={q.id} data={q} authedUser={authedUser} author={users[q.author]} answered={false} /> )
        :
          'No unanswered questions to display.'
      }
      </Fragment>
  )
}

