import React from "react";
import SVG from "../SVG/SVG";
import Title from "../Title/Title";
import "./thank-you.css";


class ThankYou extends React.Component {

    render() {
        return (
            <div className={`thank-container ${this.props.class}`} style={{
                top: this.props.top,
                opacity: this.props.opacity,
                display: this.props.display
            }} >
                <Title h1={`Thank you ${this.props.username} for using the app !`} p="We are so happy that you used our app see you in another web app" />
                <SVG.ThankYou />
                <div className="btn-social-container">
                    <button onClick={this.props.delete} className="thank-btn-1" >Delete account <SVG.deleteAccount/></button>
                    <SVG.SocialMedia />
                    <button onClick={this.props.click} className="thank-btn-2" >Log out <SVG.Logout/></button>
                </div>
            </div>
        )
    }
}

export default ThankYou;