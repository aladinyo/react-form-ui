import React from "react";
import SVG from "../SVG/SVG";
import '../LoggedIn/logged-in.css';


class LoggedOut extends React.Component {

    state = {
        transform: 'translateY(-50px)',
        left: "0",
        width: "100%",
        childOpacity: 0,
        verifyOpacity: 0,
    }

    componentDidMount() {
        this.setState({
            verifyOpacity: 1,
        })
        setTimeout(() => {
            this.setState({
                childOpacity: 1,
                transform: 'translateY(0px)',
            })
        }, 1020);
    }

    click = () => {
        this.setState({
            transform: 'translateY(-50px)',
            childOpacity: 0,
        })
        setTimeout(() => {
            this.setState({
                left: "50%",
                width: "50%",
            })
        }, 400);
        setTimeout(() => {
            this.setState({
                verifyOpacity: 0,
            })
        }, 900);
        setTimeout(() => {
            this.props.click();
        }, 1210);
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
                    transform: this.state.transform
                }}>
                    <SVG.LoggedIn />
                    <h1 className="title" >Successfully logged out</h1>
                    <p>You have successfully logged out from your account you can go now to homepage</p>
                    <p>Please click on continue to go to homepage</p>
                    <button type="button" onClick={this.click} >Continue</button>        
                </div>
            </div>
        )
    }
}

export default LoggedOut;
