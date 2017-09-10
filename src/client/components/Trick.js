import React from "react"
import { connect } from "react-redux"
import TeX from "react-formula-beautifier"
import "../main.css"

export default class Trick extends React.Component {
	render () {
		var classType = ""
		var texValue = ""
		if(this.props.info[0] == "newCoinTrickEvent") {
			classType = "infoBoxYellow"
			if(this.props.info[1] == "c1") {
				texValue = <div>
				<p style={{fontWeight: "bold", textAlign: "center"}}>You got exactly <i>k</i> heads/tails out of <i>n</i> coins</p>
				</div>
			}
		} else if (this.props.info[0] == "newDiceTrickEvent") {
			classType = "infoBoxGreen"
		}
		return  <div className={classType} style={{width: 430, position: "relative", padding: "1px", marginLeft: "35px"}}>
			{texValue}
			<p style={{marginTop: "10px", margin: "20px", maxWidth: "450px"}}><b>Description:</b> {this.props.info[2]}</p>
		</div>
	}
}