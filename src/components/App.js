import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";

import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'

import Login from './Login';
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';
import QuestionItem from './QuestionItem';
import NotFound from './NotFound';

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authedUser, users, qs } = this.props;
    const user = users[authedUser];
    
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <NavLink
                    exact
                    activeClassName="active" 
                    className="nav-link"
                    to={{
                        pathname: "/",
                    }}>
                    Home 
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link" 
                    to={{
                        pathname: "/add",
                    }}>
                    New Question
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link" 
                    to={{
                        pathname: "/leaderboard",
                    }}>
                    Leader Board 
                  </NavLink>
                </li>
              </ul>
              <div className="userInfo ml-auto">
                {this.props.loading === true
                  ? null
                  : <span className="text-white">Hello, {user.name} 
                      <img className="user-img" src={user.avatarURL} width="50px" alt="" /> 
                      <span className="hyper-link" onClick={()=> this.props.dispatch(setAuthedUser(null))}>Logout</span>
                    </span>
                }
              </div>
            </div>
          </div>
        </nav>
  
        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-5 mb-5">
              {this.props.loading === true
                ? <Login users={users} />
                : 
                  <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Dashboard questions={qs} users={users} authedUser={authedUser} />
                        )}
                    />

                    <Route
                      exact
                      path="/leaderboard"
                      render={()=> (
                        <Leaderboard users={users} />
                      )}
                    />

                    <Route
                      exact
                      path="/add"
                      render={()=> (
                        <NewQuestion authedUser={authedUser} />
                      )}
                    />
                  
                    <Route
                      exact
                      path="/questions/:question_id"
                      render={(props)=> {
                        const qID = props.match.params.question_id
                        const q = qs[qID]
                        return (
                          q ?
                          <QuestionItem data={q} authedUser={authedUser} author={users[q.author]} singleView={true} /> 
                          :
                          <NotFound />
                        )}
                      }

                    />
                    
                    <Route
                      exact
                      path="*"
                        render={() => (
                          <NotFound />
                        )}
                    />
                  </Switch>
                    
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}


function mapStateToProps ({ authedUser, users, questions }) {

  return {
    loading: authedUser === null,
    users: users,
    authedUser: authedUser,
    qs: questions
  }
}



export default connect(mapStateToProps)(App)