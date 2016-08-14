import React, { Component, PropTypes } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { Actions as StartupActions } from './Redux/Startup.redux'
import { Actions as LogoActions } from './Redux/Logo.redux'
import { Actions as RepoActions } from './Redux/Repo.redux'

const Styles = {
  button: {
    fontSize: 15,
    padding: 10,
    margin: '10px 10px',
    backgroundColor: '#333333',
    border: 0,
    borderRadius: 4,
    color: '#eeeeee'
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40
  }
}

class App extends Component {

  static propTypes = {
    startup: PropTypes.func.isRequired,
    message: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
    sha: PropTypes.string,
    error: PropTypes.string,
    fetching: PropTypes.bool
  }

  componentWillMount () {
    // this.props.startup()
  }

  renderError () {
    const { error } = this.props
    return (
      <div>
        <h3 className='App-error-title'>Big Ol Error</h3>
        <p className='App-error'>
          { error }
        </p>
      </div>
    )
  }

  renderMessage () {
    const { fetching, name, url, message, sha } = this.props
    if (fetching) {
      return (<p className='App-message'>Hang tight</p>)
    }

    return (
      <div>
        <p className='App-message'><b>{name}</b></p>
        <p className='App-message'>
          <a href={url} target='somewhere'>{message}</a>
        </p>
        <p className='App-sha'>{sha}</p>
      </div>
    )
  }

  render () {
    const { error, speed, size, repo, avatar } = this.props
    const logoStyles = {
      animation: `App-logo-spin infinite ${speed}s linear`,
      height: `${size}px`
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Reactotron Demo</h2>
          <div>
            <button style={Styles.button} onClick={this.props.slower}>Slow</button>
            <button style={Styles.button} onClick={this.props.faster}>Fast</button>
            <button style={Styles.button} onClick={this.props.bigger}>Big</button>
            <button style={Styles.button} onClick={this.props.smaller}>Small</button>
          </div>
          <img src={logo} style={logoStyles} alt="logo" />
        </div>
        { repo &&
          <h3 className='App-message-title'>Latest Commit From {repo}</h3> }
        { avatar &&
          <div><img src={avatar} style={Styles.avatar} alt="avatar" /></div>
        }
          <button style={Styles.button} onClick={this.props.requestReactotron}>Reactotron</button>
          <button style={Styles.button} onClick={this.props.requestReactNative}>React Native</button>
          <button style={Styles.button} onClick={this.props.requestMobx}>Mobx</button>
          <button style={Styles.button} onClick={this.props.requestRedux}>Redux</button>

        { error ? this.renderError() : this.renderMessage() }


      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.repo, ...state.logo })

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
  faster: () => dispatch(LogoActions.changeSpeed(1)),
  slower: () => dispatch(LogoActions.changeSpeed(20)),
  bigger: () => dispatch(LogoActions.changeSize(160)),
  smaller: () => dispatch(LogoActions.changeSize(40)),
  requestReactotron: () => dispatch(RepoActions.request('reactotron/reactotron')),
  requestReactNative: () => dispatch(RepoActions.request('facebook/react-native')),
  requestMobx: () => dispatch(RepoActions.request('mobxjs/mobx')),
  requestRedux: () => dispatch(RepoActions.request('reactjs/redux'))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);