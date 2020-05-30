export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION'
export const NEW_QUESTION = 'NEW_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function answerQuestion (payload) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    payload
  }
}

export function newQuestion (payload) {
  return {
    type: NEW_QUESTION,
    payload
  }
}