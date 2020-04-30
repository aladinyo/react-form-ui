import React from "react"
import SVG from "../SVG/SVG";
import Title from "../Title/Title";
import './verify-email.css';


class VerifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            h1: "Verify your email",
            padding: 0,
            childOpacity: 0,
            verifyOpacity: 0,
            width: "50%",
            left: this.props.left,
            fetching: false,
        }
    }

    resendEmail = async () => {
        this.setState({
            childOpacity: 0,
            padding: 0,
        })
        await new Promise(r => {
            setTimeout(() => {
                this.setState({
                    fetching: true
                })
                r();  
            }, 410);
        })
        try {
            await this.props.resendEmail();
        }catch(e) {
            console.log(e);
        }
        this.setState({
            fetching: false
        })
        this.setState({
            childOpacity: 1,
            padding: 38,
            h1: "Email was resent"
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                verifyOpacity: 1,
            })
        }, 10);
        setTimeout(() => {
            this.props.setBack();
            this.setState(() => {
                if (this.props.left === "50%")
                    return{width: "100%", left:"0"}
                return{width: "100%",}    
            });  
        }, 310);
        setTimeout(() => {
            this.setState({
                childOpacity: 1,
                padding: 38
            })
        }, 810);
    }

    unmount = () => {   
        if (this.props.left === "0") {
            this.props.click();
        }
        this.setState({
            childOpacity: 0,
            padding: 0,
        })
        setTimeout(() => {
            this.setState({
                left: "50%",
                width: "50%",
            })
        }, 410);
        setTimeout(() => {
            this.setState({
                verifyOpacity : 0,
            })
        }, 910);
        setTimeout(() => {
            this.props.gotIt();
        }, 1410);
    }

    render() {
        return (
            <div className="verify-email" 
            style={{
                paddingTop: this.state.padding, 
                width: this.state.width, 
                left: this.state.left,
                opacity: this.state.verifyOpacity,
            }} >
                <div className="child" style={{opacity: this.state.childOpacity}} >
                    <Title h1={this.state.h1} p="Account successfully made please verify your email" />
                    <SVG.EmailEnvlope />
                    <p>An Email has been sent to <span className="user-email">{this.props.email} </span> with a link to verify your account.</p>
                    <p>If you have not receive the mail please click on resent email</p>
                    <div className="verify-btn">
                        <button onClick={this.resendEmail} type="button" className="verify-btn1" >Resend email</button>
                        <button onClick={this.unmount} type="button" className="verify-btn2" >Got it</button>
                    </div>         
                </div>
                {this.state.fetching ? <SVG.Loader /> : null}   
            </div>
        )
    }
}

export default VerifyEmail;