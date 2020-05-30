import React from 'react'
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser'

class Login extends React.Component {
  state = {
    userID: null
  }
  
  handleChange = (e) => {
    this.setState({userID: e.target.value});
  }

  render() {
    const { users } = this.props
    const usersArr = Object.keys(users).map(((k) => users[k]))
    let userList = usersArr.map(user => {
        return <option key={user.id} value={user.id}>{user.name}</option>
      }
    );
    
    return (
      
      <div className="card mt-5">
        <article className="card-body">
        <h4 className="card-title mb-4 mt-1">Sign in</h4>
          <form>
            <div className="form-group">
              <select defaultValue="" className="form-control" onChange={this.handleChange}>
                <option value="" disabled>- Select user -</option>
                {userList}
              </select>

            </div>
            <div className="form-group">
                <button 
                  onClick={(e)=> {
                    e.preventDefault();
                    this.props.onUserLogin(this.state.userID)
                  }} 
                  className="btn btn-success btn-block"> Login  </button>
            </div>
          </form>
        </article>
      </div>
    
      
    )
  }
  
}

function mapStateToProps({users}) {
  return {
    users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onUserLogin: (id)=> dispatch(setAuthedUser(id))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login)