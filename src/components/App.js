import React from 'react';
import { Route, Switch, Link } from "react-router-dom";

import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'

import Login from './Login';
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authedUser, users } = this.props;
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
                <li className="nav-item active">
                  <Link 
                    className="nav-link"
                    to={{
                        pathname: "/",
                    }}>
                    Home 
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link" 
                    to={{
                        pathname: "/add",
                    }}>
                    New Question
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link" 
                    to={{
                        pathname: "/leaderboard",
                    }}>
                    Leader Board 
                  </Link>
                </li>
              </ul>
              <div className="userInfo ml-auto">
                {this.props.loading === true
                  ? null
                  : <span className="text-white">Hello, {user.name} 
                      <img className="user-img" src={user.avatarURL} width="50px" alt="" /> 
                      Logout
                    </span>
                }
              </div>
            </div>
          </div>
          
        </nav>
  
        <div>
          {this.props.loading === true
            ? <Login users={users} />
            : 
              <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Dashboard authedUser={authedUser} />
                    )}
                />

                <Route
                  exact
                  path="/leaderboard"
                  render={()=> (
                    <Leaderboard  />
                  )}
                />

                <Route
                  exact
                  path="/add"
                  render={()=> (
                    <NewQuestion  />
                  )}
                />

                <Route
                  exact
                  path="*"
                    render={() => (
                        <h1 className="prime-color mt-5">Page Not Found</h1>
                    )}
                />
              </Switch>
                
          }
        </div>
      </div>
    );
  }
  
}


function mapStateToProps ({ authedUser, users }) {

  console.log(authedUser, users)
  return {
    loading: authedUser === null,
    users: users,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(App)