import React, { Component } from 'react';
import './App.css';

class ChildWithError extends Component {
  state = {
    hasError: false,
    error: ''
  }

  handleError = e => {
    e.preventDefault()
    this.setState({
      hasError: true,
      error: 'Throw error from ChildWithError'
    })
  }


  render() {
    const { hasError, error } = this.state

    if (hasError) throw new Error(error)

    return (
      <button onClick={this.handleError}>Throw error</button>
    )
  }
}

class App extends Component {
  state = {
    hasError: false,
    error: ''
  }

  componentDidCatch(error, info) {
    if (error) {
      console.log(info.componentStack)
      this.setState({
        hasError: true,
        error: error.message
      })
    }
  }

  handleError = e => {
    e.preventDefault()
    this.setState({
      hasError: false,
      error: ''
    })
  }

  render() {
    const { hasError, error } = this.state
    return (
      <div className="App">
        { hasError
          ? (<button onClick={this.handleError}>{`${error} <- click to back`}</button>)
          : (<ChildWithError />)
        }
      </div>
    );
  }
}

export default App;
