import React from 'react';
import Title from '../Title/Title';
import SVG from '../SVG/SVG';
import Input from '../Input/Input';
import Error from '../Error/Error';
import './form.css';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'email',
            username: 'username',
            password: 'password',
            emailClass: '',
            usernameClass: '',
            passwordClass: '',
            passType: "text",
            passClicked: false,
            opacity: 1,
            display: "block",
        };
    }

    handleFocus = (input) => {
        if (this.state[input] === input) {
            this.setState({
                [input]: '',
            })
        }
        if (input === "password" && !this.validateInput("password") && this.state.passType === "text" && !this.state.passClicked) {
            this.setState({
                passType: "password",
            })
        }
    }

    handleBlur = (input) => {
        if (!this.validateInput(input)) {
            this.setState({
                [input]: input,
            })
        }
        if(input === "password" && !this.validateInput("password")) {
            this.setState({
                passType: "text"
            })
        }
    }

    handleChange = (input, event) => {
        this.setState({
            [input]: event.target.value,
        });
    }

    passClick = () => {
        this.setState(prevState => {
            if (!prevState.passClicked) {
                return {
                    passClicked: true,
                    passType: "text"
                }
            }else if(!this.validateInput("password")) {
                return {
                    passClicked: false,
                    passType: "text"
                }
            }
            return {
                passClicked: false,
                passType: "password"
            }
        });
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    validateInput(input) {
        const state = this.state
        return state[input] !== '' && state[input] !== input;
    }

    inputError() {
        const arr =['username', 'password'];
        for (const cur of arr) {
            if (!this.validateInput(cur)) {
                this.setState({
                    [cur+'Class']: 'input-error',
                })
                setTimeout(() => {
                    this.setState({
                        [cur+'Class']: '',
                    })
                }, 230);
            }  
        }
        if(!this.validateEmail(this.state.email)) {
            this.setState({
                emailClass: 'input-error',
            })
            setTimeout(() => {
                this.setState({
                    emailClass: '',
                })
            }, 230);
        }  
    }

    removeInputs = async () => {
        this.setState({
            opacity: 0,
        });
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                this.setState({
                    display: "none",
                })
                resolve();
            }, 110);
        })
    }
    
    showInputs = () => {
        this.setState({
            display: 'block',
            opacity: 1,
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const state = this.state;
        if (this.props.selectAuth && !this.props.auth.fetching) {//sign up
            if (this.validateEmail(state.email) && this.validateInput('username') && this.validateInput('password')) {
                await this.removeInputs();
                this.props.isFetch();
                await this.props.auth.signUp(state.email, state.username, state.password);
                this.props.isFetch();
                setTimeout(this.showInputs,500);
            } else {
                this.inputError();
            }    
        } else if(!this.props.auth.fetching) {//login in
            if (this.validateEmail(state.email) && this.validateInput('password')) {
                await this.removeInputs();
                this.props.isFetch();
                await this.props.auth.logIn(state.email, state.password);
                this.props.isFetch();
                setTimeout(this.showInputs,500);
            } else this.inputError();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectAuth !== prevProps.selectAuth) {
            this.setState({
                email: 'email',
                username: 'username',
                password: 'password',
                passType: "text",
            })
        }
        if (this.props.clearInput !== prevProps.clearInput) {
            this.setState({
                email: 'email',
                password: 'password',
                passType: 'text'
            })
        }
    }

    render() {
        const props = this.props; 
        const state = this.state;
        return(
            <form onSubmit={this.handleSubmit} style={{left: this.props.left}} >
                 <Title h1={props.titleH1} p={props.titleP} class="form-title" style={{opacity: props.titleOpacity}} />
                {this.props.auth.fetching ? <SVG.Loader /> : null}
                <div className="form-input-container" style={{opacity: state.opacity, display: state.display}} >
                    <Input type="text" class={state.emailClass} change={(event) => this.handleChange('email', event)} focus={() => this.handleFocus('email')}
                    value={this.state.email} icon1={<SVG.Email />} top="128px" left="71px" blur={() => this.handleBlur('email')} />

                    <Input type="text" class={state.usernameClass} change={(event) => this.handleChange('username', event)} focus={() => this.handleFocus('username')}
                    value={this.state.username} icon1={<SVG.Person />} top="179px" left="71px" blur={() => this.handleBlur('username')}
                    opacity={props.usernameOpacity} />

                    <Input type={state.passType} class={state.passwordClass} change={(event) => this.handleChange('password', event)} focus={() => this.handleFocus('password')}
                    value={this.state.password} icon1={<SVG.Password />} icon2={<SVG.Eye clicked={state.passClicked} click={this.passClick} />} blur={() => this.handleBlur('password')} 
                    top={this.props.inputTop} left="71px" />

                    <div className="remember-me" 
                    style={{top: this.props.rememberTop, opacity: this.props.rememberOpacity, display: this.props.rememberDisplay}} >
                        <input type="checkbox" id="check" /><span className="span" >remember me</span><span>forgot password ?</span>
                    </div>
                </div>
                <input type="submit" value={props.btnText} className="btn" style={{color: '#4D05E8', background:'white'}} />
                <p className="or" >Or</p>
                {this.props.auth.errorCode ? <Error tryAgain={props.tryAgain} errorCode={this.props.auth.errorCode} /> : null}
                <SVG.Faceboook />
                <SVG.Twitter />
                <SVG.Google />
            </form>
        )
    }
}

export default Form;