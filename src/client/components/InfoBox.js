import React from "react"
import { connect } from "react-redux"
import TeX from "react-formula-beautifier"
import "../main.css"

import { deleteEventBoxText } from "../actions/infoBoxActions"


@connect((store) => {
	return {
		infoBox: store.infoBox,
	};
})
export default class InfoBox extends React.Component {

	deleteBox() {
		this.props.dispatch(deleteEventBoxText(this.props.num))
	}

	render () {
		var position = 20+20*this.props.num;
		var positionText = position+"%";
		var content = <div></div>
		var texValue = "";
		console.log(this.props.info)
		if (this.props.info[1] == "c1") {
			texValue = <div>
			<p style={{textAlign: "center"}}>You got exactly <i>k</i> heads/tails out of <i>n</i> coins</p>
			<div style={{fontWeight: "bold", textAlign: "center"}}>Probability formula: <TeX value="$P(n,k)= \binom nk*\frac{1}{2^n}$" /></div>
			</div>
		} else if (this.props.info[1] == "c2") {

		}
		if(this.props.info[0] == "newBlueEvent") {
			content = <div className="infoBox" style={{bottom : position}}>
			<div className="xButton" onClick={this.deleteBox.bind(this)}><img src="./images/close.png" style={{maxWidth:"100%", maxHeight:"100%"}}/></div>
			<h2 style={{margin: "10px", textAlign: "center"}}>New blue event unlocked</h2>
			<p style={{fontWeight: "bold", textAlign: "center"}}>Probability: {this.props.info[1]}</p>
			<p style={{marginTop: "10px", margin: "20px"}}>{this.props.info[2]}</p>
		</div>
		} else if(this.props.info[0] == "newUpgradeEvent") {
			content = <div className="infoBoxRed" style={{bottom : position}}>
			<div className="xButton" onClick={this.deleteBox.bind(this)}><img src="./images/close.png" style={{maxWidth:"100%", maxHeight:"100%"}}/></div>
			<h2 style={{margin: "10px", textAlign: "center"}}>New upgrade unlocked</h2>
			<p style={{fontWeight: "bold", textAlign: "center"}}>{this.props.info[1]}</p>
			<p style={{marginTop: "10px", margin: "20px", textAlign: "center"}}>{this.props.info[2]}</p>
		</div>
		} else if(this.props.info[0] == "newCoinTrickEvent") {
			{console.log(this.props.info)}
			content = <div className="infoBoxYellow" style={{bottom : position}}>
			<div className="xButton" onClick={this.deleteBox.bind(this)}><img src="./images/close.png" style={{maxWidth:"100%", maxHeight:"100%"}}/></div>
			<h2 style={{margin: "10px", textAlign: "center"}}>New coin trick unlocked</h2>
			{texValue}
			<p style={{marginTop: "10px", margin: "20px"}}><b>Description:</b> {this.props.info[2]}</p>
		</div>
		} else if(this.props.info[0] == "newDiceTrickEvent") {
			content = <div className="infoBoxGreen" style={{bottom : position}}>
			<div className="xButton" onClick={this.deleteBox.bind(this)}><img src="./images/close.png" style={{maxWidth:"100%", maxHeight:"100%"}}/></div>
			<h2 style={{margin: "10px", textAlign: "center"}}>New dice trick unlocked</h2>
			<div style={{fontWeight: "bold", textAlign: "center"}}>{this.props.info[1]}</div>
			<div style={{fontWeight: "bold", textAlign: "center"}}>Probability formula: {this.props.info[2]}</div>
			<p style={{marginTop: "10px", margin: "20px"}}><b>Description:</b> {this.props.info[3]}</p>
		</div>
		}
		return <div>{content}</div>
	}
}