import React from 'react';
import './input.css';

class Input extends React.Component {

    render() {
        const props = this.props;
        return(
            <div className={`input-container ${props.class}`} 
            style={{top: this.props.top, left: this.props.left, opacity: this.props.opacity, display: this.props.inputDisplay}} >
                <input onBlur={props.blur} onFocus={this.props.focus} onChange={this.props.change} type={props.type} value={this.props.value} />
                {this.props.icon1}
                {this.props.icon2}
            </div>
        )
    }
}

export default Input