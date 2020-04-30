import React from 'react';
import './title.css'

class Title extends React.Component {

    render() {
        return(
            <div className={`title-container ${this.props.class}`} style={this.props.style} >
                <h1 className="title" >{this.props.h1} </h1>
                <p className="text" >{this.props.p} </p>
            </div>
        )
    }
}

export default Title;