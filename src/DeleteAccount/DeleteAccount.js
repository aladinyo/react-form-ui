import React from "react";
import SVG from "../SVG/SVG";
import '../LoggedIn/logged-in.css';
import './delete-account.css'


class DeleteAccount extends React.Component {
    state = {
        transform: 'translateY(-36.29px)',
        left: "0%",
        width: "100%",
        childOpacity: 0,
        verifyOpacity: 0,
        childDisplay: 'block',
        deletedDisplay: 'none',
        loading: false,
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

    delete = async () => {
        this.props.clearInput();
        this.setState({
            childOpacity: 0,
            transform: 'translateY(-36.29px)'
        })
        await new Promise(r => {
            setTimeout(() => {
                this.setState({
                    childDisplay: 'none',
                    loading: true,
                })
                r();
            }, 500);
        })
        await this.props.deleteUser();
        this.setState({
            loading: false,
            deletedDisplay: 'block',
        })
        setTimeout(() => {
            this.setState({
                childOpacity: 1,
                transform: 'translateY(13.71px)'
            })
        }, 20);
    }

    click = () => {
        this.setState({
            transform: 'translateY(-36.29px)',
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

    keepAccount = () => {
        this.setState({
            transform: 'translateY(-36.29px)',
            childOpacity: 0,
        })
        setTimeout(() => {
            this.props.continue();
        }, 400);
        setTimeout(() => {
            this.props.click();
        }, 1010);
    }

    render() {
        return (
        <div className="logged-in delete-account"
            style={{
                opacity: this.state.verifyOpacity,
                left: this.state.left,
                width: this.state.width,
            }} >
            <div className="child" style={{
                opacity: this.state.childOpacity,
                transform: this.state.transform,
                display: this.state.childDisplay
            }}>
                <SVG.SadFace class="delete-face"/>
                <h1 className="title" >Delete your account ?</h1>
                <p>We are sorry to see you go if you delete your account you can't go back</p>
                <p>click on delete account to delete your account.</p>
                <button onClick={this.keepAccount} className="delete-btn1" type="button">Keep account</button>  
                <button onClick={this.delete} className="delete-btn2" >Delete account</button>      
            </div>
            <div className="child child2" style={{
                    opacity: this.state.childOpacity,
                    transform: this.state.transform,
                    display: this.state.deletedDisplay,
                }}>
                    <SVG.LoggedIn />
                    <h1 className="title" >Account was deleted</h1>
                    <p>You have successfully deleted your account you can go now to homepage</p>
                    <p>Please click on continue to go to homepage</p>
                    <button type="button" onClick={this.click} >Continue</button>        
                </div>
            {this.state.loading ? <SVG.Loader />: null}
        </div>
        )
    }
}

export default DeleteAccount;