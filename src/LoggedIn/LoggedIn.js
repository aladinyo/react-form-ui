import React from "react";
import SVG from "../SVG/SVG";
import './logged-in.css';


class LoggedIn extends React.Component {
    state = {
        transform: 'translateY(-50px)',
        left: "50%",
        width: "50%",
        childOpacity: 0,
        verifyOpacity: 0,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                verifyOpacity: 1,
            })
        }, 10);
        setTimeout(() => {
            this.setState({
                left: '0',
                width: "100%",
            });  
        }, 310);
        setTimeout(() => {
            this.setState({
                childOpacity: 1,
                transform: 'translateY(0px)',
            })
        }, 810);
    }

    click = () => {
        this.setState({
            transform: 'translateY(-50px)',
            childOpacity: 0,
        })
        setTimeout(() => {
            this.props.click();
        }, 400);
        setTimeout(() => {
            this.props.isLogged();
        }, 1010);
    }

    render() {
        return (
            <div className="logged-in"
            style={{
                opacity: this.state.verifyOpacity,
                left: this.state.left,
                width: this.state.width,
            }} >
                <div className="child" style={{
                    opacity: this.state.childOpacity,
                    transform: this.state.transform,
                }}>
                    <SVG.LoggedIn />
                    <h1 className="title" >Successfully logged in</h1>
                    <p><span>{this.props.username} </span> has successfully logged in you can now go to your profile.</p>
                    <p>Please click on continue to access your account.</p>
                    <button type="button" onClick={this.click} >Continue</button>        
                </div>
            </div>
        )
    }
}

export default LoggedIn;