import React from "react"
import "../main.css"

export default class Dice extends React.Component {
	render () {
		var size = 100*(15+this.props.size);
		var margin = -size/25
		if(margin < -130) {
			margin = -130
		}
		margin += this.props.space;
		var rotations =  "translateZ( -" + size + "px ) " + this.props.rotation;
		var upgraded = ""
		if(this.props.value == 5) {
			upgraded = "a"
		} else if(this.props.value == 10) {
			upgraded = "b"
		} else if(this.props.value == 20) {
			upgraded = "c"
		}
		return <div className="wrap" style={{marginRight: margin, marginBottom: margin}}>
					<div className="cube" style={{transform: rotations}}>
						<div className="front" style={{backgroundImage: "url('images/dice1" + upgraded + ".png')" ,backgroundSize: "contain" }}></div>
						<div className="back" style={{backgroundImage: "url('images/dice6" + upgraded + ".png')" ,backgroundSize: "contain" }}></div>
						<div className="top" style={{backgroundImage: "url('images/dice2" + upgraded +".png')" ,backgroundSize: "contain" }}></div>
						<div className="bottom" style={{backgroundImage: "url('images/dice5" + upgraded + ".png')" ,backgroundSize: "contain" }}></div>
						<div className="left" style={{backgroundImage: "url('images/dice4" + upgraded + ".png')" ,backgroundSize: "contain" }}></div>
						<div className="right" style={{backgroundImage: "url('images/dice3" + upgraded + ".png')" ,backgroundSize: "contain" }}></div>
					</div>
				</div>
	}
}