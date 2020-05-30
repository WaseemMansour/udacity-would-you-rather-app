import { RECEIVE_QUESTIONS, ADD_ANSWER_TO_QUESTION, NEW_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_ANSWER_TO_QUESTION : 
      const question = state[action.qID]
      const qOption = question[action.answer]
      const updatedVotes = [...qOption.votes].concat(action.authedUser)
  
      const updatedQ = {
        ...question,
        [action.answer]: {
          ...qOption,
          votes: updatedVotes
        }
      }
      return {
        ...state,
        [updatedQ.id]: {
          ...updatedQ
        }
      }
    case NEW_QUESTION : 
      const newQuestion = action.q
      return {
        ...state,
        [newQuestion.id]: {
          ...newQuestion
        }
      }
    default :
      return state
  }
}