import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js'

export const getInitialData = async () => {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions,
    }))
}

export const saveQuestion = async (question) => {
  return _saveQuestion(question)
}

export const saveQuestionAnswer = async (authedUser, qid, answer) => {
  return _saveQuestionAnswer(authedUser, qid, answer)
}