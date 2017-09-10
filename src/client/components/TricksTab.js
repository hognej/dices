import React from "react"
import { connect } from "react-redux"
import "../main.css"
import math from "mathjs"
import TeX from "react-formula-beautifier"

import Trick from "./Trick.js"

@connect((store) => {
	return {
		infoBox: store.infoBox,
	};
})

export default class TricksTab extends React.Component {

	render () {
		const mappedcoinTricks = this.props.infoBox.coinTricksText.map((trick) => <Trick info = {trick} />);
		const mappedDiceTricks = this.props.infoBox.diceTricksText.map((trick) => <Trick info = {trick} />);
		return <div>
			{mappedDiceTricks.reverse()}
			{mappedcoinTricks.reverse()}
		</div>
	}
}