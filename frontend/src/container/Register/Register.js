import React, { Component } from 'react';

// action creator

import { RegisterAction } from '../../store/actions/auth';

import { connect } from 'react-redux';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: ''
  }
  
  handleSubmit = (ev) => {
    ev.preventDefault();
    let errorMessage = '';

    if (!this.state.username) {
      errorMessage += 'Missing Username \n';

      // focus on the error input

      document.querySelector('input#username').classList.add('error')
    }

    if (!this.state.email) {
      errorMessage += 'Missing Email \n';

      // focus on the error input
      document.querySelector('input#email').classList.add('error');
    } 
    
    if (!this.state.password) {
      errorMessage += 'Missing Password \n';

      // focus on the error input
      document.querySelector('input#password').classList.add('error');
    }

    
    if (errorMessage) {
      this.setState({
        error: errorMessage
      });
    } else {
      this.setState({
        error: ''
      });
      console.log(this.state)

      this.props.registerUser(this.state, this.props.history); 
    }

  }

  handleChange = (ev) => {
    ev.target.classList.remove('error');

    this.setState({
      [ev.target.id]: ev.target.value.trim()
    });
  }

  render () {
    return (
      <div>
        <h1>
          this is the register page.
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label
              htmlFor="username">
              username
          </label>
            <input
              type="text"
              id="username"
              onChange={this.handleChange}
              value={this.state.username} />
          </div>
          <div>
            <label
              htmlFor="email">
              email
          </label>
            <input
              type="email"
              id="email"
              onChange={this.handleChange}
              value={this.state.email} />
          </div>
          <div>
            <label
              htmlFor="password">
              password
            </label>
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
              value={this.state.password} />
          </div>

          {this.state.error ? (
            <p>
              {this.state.error}
            </p>) : (null) }

          {this.props.authError ? (
            <p>
              {this.props.authError}
            </p>) : (null)}
          <button>
            create
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (user, history) => {
      dispatch(RegisterAction(user, history));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);