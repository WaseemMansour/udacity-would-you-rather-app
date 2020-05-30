import { RECEIVE_USERS, UPDATE_USER_ANSWERS } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case UPDATE_USER_ANSWERS :
      const { qID, answer, authedUser } = action
      const user = state[authedUser]
      const updatedAnswers = {
        ...user.answers,
        [qID]: answer
      }
      return {
        ...state,
        [user.id] : {
          ...user,
          answers: updatedAnswers
        } 
        
      }  
    default :
      return state
  }
}