import React from 'react';
import ReactDOM from 'react-dom';
import SVG from './SVG/SVG';
import Title from './Title/Title';
import Form from './Form/Form';
import Auth from './Auth/Auth';
import Circles from './Circle/Circle';
import VerifyEmail from './VerifyEmail/VerifyEmail';
import LoggedIn from './LoggedIn/LoggedIn';
import ThankYou from "./ThankYou/ThankYou";
import LoggedOut from "./LoggedOut/LoggedOut";
import './index.css';
import * as firebase from 'firebase/app';
import DeleteAccount from './DeleteAccount/DeleteAccount';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clearInput: false,
      auth: new Auth(),
      selectAuth: false,
      back: '#4D05E8',
      titleOpacity: 1,
      titleH1: 'Welcome back !',
      titleP: 'Log in to your account to continue',
      humanRightOpacity: 0,
      btnText: 'Sign up',
      btnLeft: '67px',
      inputTop: 179,
      rememberTop: 246,
      rememberOpacity: 1,
      rememberDisplay: 'flex',
      formLeft: '50%',
      usernameOpacity: '0',
      thankClass: "thank-top",
      thankOpacity: 0,
      thankDisplay: "none",
      containerDisplay: "block",
      containerOpacity: "1",
      class: 'container',
      loggedOut: false,
      deleteAccount: false,         
    }
  }

  isLoggedOut = () => {
    this.setState(state => ({
      loggedOut: !state.loggedOut,
    }))
  }

  isDeleted = () => {
    this.setState(state => ({
      deleteAccount: !state.deleteAccount,
    }))
  }

  isFetch = () => {
    this.setState(prevState => {
      const auth = prevState.auth;
      auth.fetching = !auth.fetching;
      return {auth}
    })
  }

  isLogged = () => {
    this.setState(prevState => {
      const auth = prevState.auth;
      auth.loggedIn = !auth.loggedIn;
      return {auth}
    })
  }

  clearInput = () => {
    this.setState(state => ({
      clearInput: !state.clearInput
    }))
  }

  tryAgain = async () => {
    this.setState(prevState => {
        const auth = prevState.auth;
        auth.errorCode = null;
        return {
            auth
        }
    })
  }

  logout = (stateChanger) => {
    stateChanger();
    this.setState({
      thankClass: 'thank-top',
      thankOpacity: 0,
      containerDisplay: "block"
    });
    setTimeout(() => {
      this.setState({
        thankDisplay: 'none',
        class: 'container',
        containerOpacity: '1'            
      })
    }, 610);
  }

  continue = async () => {
    this.setState({
      class: 'container scale-container',
      containerOpacity: "0",
      thankDisplay: "block",
    });
    await new Promise(r => setTimeout(() => {
      this.setState({
        containerDisplay: "none",
        thankClass: "",
        thankOpacity: 1,
      })
    }, 400))
  }

  gotIt = () => {
    this.setState(prevState => {
      const auth = prevState.auth;
      auth.verifyEmail = false;
      return {
          auth
      }
    })
  }

  setBack = () => {
    this.setState({
      back: "#4D05E8",
    })
  }

  click = () => {
    const auth = this.state.auth;
    if (!auth.fetching && !auth.errorCode) {
      const state = this.state;
      if (state.inputTop === 179) {
        this.setState({
          selectAuth: true,
          back: 'white',
          titleOpacity: 0,
          humanRightOpacity: 1,
          rememberTop: '210px',
          rememberOpacity: '0',
          formLeft: '0',
          btnLeft: '436px',
          btnText: 'Log in',
          usernameOpacity: '1'
        })
        setTimeout(() => {
          this.setState({
            inputTop: 230,
            inputOpacity: 1,
          })
        }, 50);
        setTimeout(() => {
          this.setState({
            rememberDisplay: 'none',
            titleH1: 'Create Account',
            titleP: 'Sign up to create your new account',
            titleOpacity: 1,
          })
        }, 400);
      } else {
        this.setState({
          selectAuth: false,
          back: '#4D05E8',
          titleOpacity: 0,
          humanRightOpacity: 0,
          btnText: 'Sign up',
          btnLeft: '67px',
          inputTop: 179,
          rememberDisplay: 'flex',
          formLeft: '50%',
          usernameOpacity: '0'
        })
        setTimeout(() => {
          this.setState({
            rememberTop: 246,
            rememberOpacity: 1,
          })
        }, 50);
        setTimeout(() => {
          this.setState({
            titleH1: 'Welcome back !',
            titleP: 'Log in to your account to continue',
            titleOpacity: 1,
          })
        }, 400);
      }
    }
  }

  componentDidMount() {

  }

  render() {
    const state = this.state;
    return (
      <div className="root" style={{background:state.back === '#4D05E8' ? 'white' : '#4D05E8'}} >
        <Circles back={this.state.back} />
        <SVG.Flower back={this.state.back} />
        <SVG.Triangle back={this.state.back} class="triangle animate" />
        <SVG.Shape1 back={this.state.back} />
        <SVG.Shape2 back={this.state.back} />
        <div className={state.class} style={{zIndex: 5, display: state.containerDisplay, opacity: state.containerOpacity}} >
          <div className="illustration" style={{opacity: state.rememberOpacity}} >
              <SVG.HumanLeft />
              <Title h1="New Here ?" p="Sign up to create your new account" />
          </div>
          <div className="illustration" style={{opacity: state.humanRightOpacity}} >
            <SVG.HumanRight />
            <Title h1="Have an account ?" p="Log in to your account to continue" />
          </div>
          <button className="btn" style={{left: state.btnLeft, position: 'absolute', top:'384px'}} 
          onClick={this.click} >{this.state.btnText} </button>
          <Form clearInput={state.clearInput} inputTop={state.inputTop} tryAgain={this.tryAgain} isFetch={this.isFetch}
          rememberTop={state.rememberTop} rememberOpacity={state.rememberOpacity} rememberDisplay={state.rememberDisplay}
          left={state.formLeft} btnText={state.btnText === 'Sign up' ? 'Log in' : 'Sign up'} selectAuth={state.selectAuth} auth={state.auth}
          titleOpacity={state.titleOpacity} titleH1={state.titleH1} titleP={state.titleP} usernameOpacity={state.usernameOpacity} />
          {state.auth.verifyEmail ? <VerifyEmail email={this.state.auth.email} click={this.click} setBack={this.setBack}
          resendEmail={state.auth.sendEmailVerification} left={state.formLeft} gotIt={this.gotIt} />: null}
          {state.auth.loggedIn ? <LoggedIn isLogged={this.isLogged} click={this.continue} username={state.auth.username} />: null}
          {state.loggedOut ? <LoggedOut click={this.isLoggedOut} />: null}
          {state.deleteAccount ? <DeleteAccount clearInput={this.clearInput} continue={this.continue} click={this.isDeleted} deleteUser={state.auth.deleteUser} /> : null}
        </div>
        <ThankYou delete={() => this.logout(this.isDeleted)} click={() => this.logout(this.isLoggedOut)} username={state.auth.username} display={state.thankDisplay} class={state.thankClass} opacity={state.thankOpacity} />
      </div>
    )
  }
}

ReactDOM.render(<App />,
document.getElementById('root'));

const firebaseConfig = {
  apiKey: "AIzaSyBDUk8VNmhnKiefEZbzfI59PJV1X19EmBw",
  authDomain: "react-form-ui.firebaseapp.com",
  databaseURL: "https://react-form-ui.firebaseio.com",
  projectId: "react-form-ui",
  storageBucket: "react-form-ui.appspot.com",
  messagingSenderId: "735989479827",
  appId: "1:735989479827:web:b594e93a05135daf985066",
  measurementId: "G-VEXFK0EMS3"
};

firebase.initializeApp(firebaseConfig);