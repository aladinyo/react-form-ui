import React from 'react';
import SVG from '../SVG/SVG';

class Circle extends React.Component {
    constructor(props) {
        super(props);
        this.border = this.props.border === undefined ? 0 : this.props.border;
    }

    render() {
        const back1 = this.props.back;
        const back2 = back1 === '#4D05E8' ? 'white' : '#4D05E8';
        const yPosition = this.props.top ? 'top' : 'bottom';
        const xPosition =  this.props.left ? 'left': 'right';
        return(<div className={`animate ${this.props.class}`} 
        style={{
            transition: 'background ease-in-out 400ms, border ease-in-out 400ms',
            background: this.props.full ? back1 : back2,
            height: this.props.dimension + 'px',
            width: this.props.dimension + 'px',
            position: 'absolute',
            borderRadius: (this.props.dimension + this.border) / 2,
            border: !this.props.full ? `${this.props.border}px solid ${back1}`: '0px',
            [yPosition]: this.props[yPosition],
            [xPosition]: this.props[xPosition],
        }} ></div>)
    }
}

function Circles(props) {
    const middle = (window.screen.width / 2) - 55
    return (<>
    <Circle back={props.back} dimension={155}
    top={'-5.72%'} left={'-3.29%'}
    full={true} />

    <Circle back={props.back} dimension={155}
    top={'32.55%'} left={'4.68%'}
    full={true} />

    <Circle back={props.back} dimension={196}
    top={'-15.36%'} left={'28.26%'}
    full={false}
    border={30} />

    <Circle back={props.back} dimension={87}
    top={-1} right={'36.74%'}
    full={false}
    border={8} />
    
    <Circle back={props.back} dimension={242}
    bottom={'-16.6%'} left={'-1.7%'}
    full={false}
    border={8} />

    <Circle back={props.back} dimension={110}
    bottom={'-7.16%'} right={'32.35%'}
    full={false}
    border={20} />

    <Circle back={props.back} dimension={461}
    top={'-42.67%'} right={'-20.21%'}
    full={true} class="large big-animate" />

    <Circle back={props.back} dimension={78}
    top={'4.3%'} right={'16.76%'}
    full={true} />
    
    {/*Mobile Version*/}


    <Circle back={props.back} dimension={100}
    top={'-6%'} left={'-12%'}
    full={true} class="animate-mobile" />

    <Circle back={props.back} dimension={178}
    top={'-15.57%'} right={'-35.66%'}
    full={true} class="animate-mobile" />
    
    <Circle back={props.back} dimension={47}
    top={'10.34%'} right={'25.6%'}
    full={true} class="animate-mobile" />

    <Circle back={props.back} dimension={47}
    bottom={'8.74%'} right={'10.13%'}
    full={true} class="animate-mobile" />

    <Circle back={props.back} dimension={78}
    bottom={'-4.8%'} right={'-10.4%'}
    full={true} class="animate-mobile" />

    <Circle back={props.back} dimension={102}
    top={'-7.88%'} right={`${middle}px`}
    full={false} border={10} class="animate-mobile" />
    
    <Circle back={props.back} dimension={48}
    top={'10.34%'} left={'11.2%'}
    full={false} border={10} class="animate-mobile" />

    <Circle back={props.back} dimension={48}
    bottom={'25.61%'} right={'10.13%'}
    full={false} border={10} class="animate-mobile" />

    <Circle back={props.back} dimension={132}
    bottom={'-7.51%'} left={'-14.93%'}
    full={false} border={8} class="animate-mobile" />

    <SVG.Flower back={props.back} class="flower-mobile-1 animate-mobile" />
    <SVG.Flower back={props.back} class="flower-mobile-2 animate-mobile" />

    <SVG.Triangle back={props.back} class="triangle-mobile-1 animate-mobile" />
    <SVG.Triangle back={props.back} class="triangle-mobile-2 animate-mobile" />

    </>)
} 

export default Circles;