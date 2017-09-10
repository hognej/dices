import React from "react"
import "../main.css"

export default class Coin extends React.Component {
	render () {
		var s = 2500/(15+this.props.size);

		return <div className="coin" style={{backgroundImage: "url('images/" + this.props.value + this.props.side.toLowerCase() + ".png')", transform: this.props.rotation, width: s, height: s, margin: this.props.space}}></div>
	}
}