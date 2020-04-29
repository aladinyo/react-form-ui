import React from 'react';
import Title from "../Title/Title";
import SVG from "../SVG/SVG";
import './error.css';


class Error extends React.Component {
    state = {
        faceTop: 80,
        faceOpacity: 0,
        opacity: 0,
        titleBtnOpacity: 0,
        allowClick : false,
    }

    click = async () => {
        if (this.state.allowClick) {
            this.setState({
                faceTop: 80,
                faceOpacity: 0,
                titleBtnOpacity: 0,
            })
            await new Promise(resolve => {
                setTimeout(() => {
                    this.setState({
                        opacity: 0,
                    })
                    resolve();
                }, 310);
            })
            await new Promise(resolve => {
                setTimeout(() => {
                    this.props.tryAgain();
                    resolve();
                }, 310);
            })
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                opacity: 1,
            });   
        }, 10);
        setTimeout(() => {
            this.setState({
                faceTop: 118,
                faceOpacity: 1,
                titleBtnOpacity: 1,
            })
        }, 320);
        setTimeout(() => {
            this.setState({
                allowClick: true,
            })
        }, 630);
    }

    render() {
        let errorH1, errorP;
        if (this.props.errorCode === "auth/wrong-password") {
            errorH1 = "Wrong password !";
            errorP = "Try again or sign up to create a new account";
        }else if (this.props.errorCode === "auth/user-not-found") {
            errorH1="User not found !";
            errorP = "Try again or sign up to create a new account";
        } else if (this.props.errorCode === "auth/email-already-in-use") {
            errorH1 = "Email already used !";
            errorP = "Try again or log in to your account to continue";
        }
        return(
            <div className="error" style={{opacity: this.state.opacity}} >
                <Title class="form-title error-title" h1={errorH1} p={errorP} style={{opacity: this.state.titleBtnOpacity}} />
                <SVG.SadFace top={this.state.faceTop} opacity={this.state.faceOpacity} />
                <button type="button" className="btn btn-err" onClick={this.click} style={{color: '#4D05E8', background:'white', marginTop: 235, display: 'inline', opacity: this.state.titleBtnOpacity}}>Try Again !</button>
                <p className="or" >Or</p>
                <SVG.Faceboook />
                <SVG.Twitter />
                <SVG.Google />
            </div>
        )
    }
}

export default Error;