import React from 'react';
import QuestionItem from './QuestionItem';

export default (props) => {
  const { currentList } = props
  return (
    currentList === 'answered' ?
      <QuestionItem username="Sarah" />
    :
      <QuestionItem username="Tyler" />
  )
}

