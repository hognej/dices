import React from "react"
import { connect } from "react-redux"
import "../main.css"
import math from "mathjs"

import { incSize, incSpace, incMargin } from "../actions/settingsActions.js"

@connect((store) => {
	return {
		coin: store.coin,
		event: store.event,
		dice: store.dice,
	};
})

export default class SettingsTab extends React.Component {

	incSize(change, instance) {
		this.props.dispatch(incSize(change, instance))
	}

	incSpace(change, instance) {
		this.props.dispatch(incSpace(change, instance))
	}

	incMargin(change, instance) {
		this.props.dispatch(incMargin(change, instance))
	}

	render () {
		var marginCoinDice = <tr></tr>
		var diceButton1 = <tr></tr>
		var diceButton2 = <tr></tr>
		if(this.props.dice.numDice > 0) {
			marginCoinDice = <tr style={{textAlign: "left"}}>
			<td>Space between coin and dice: </td>
			<td><button className="infoButton" onClick={this.incMargin.bind(this,1,"dice")}>Increase</button></td>
			<td><button className="infoButton" onClick={this.incMargin.bind(this,-1,"dice")}>Decrease</button></td>
			<td><button className="infoButton" onClick={this.incMargin.bind(this,0,"dice")}>Default</button></td>
			</tr>
			diceButton1 = <tr style={{textAlign: "left"}}>
			<td>Size of dice: </td>
			<td><button className="infoButton" onClick={this.incSize.bind(this,0.75,"dice")}>Increase</button></td>
			<td><button className="infoButton" onClick={this.incSize.bind(this,1.25,"dice")}>Decrease</button></td>
			<td><button className="infoButton" onClick={this.incSize.bind(this,0,"dice")}>Default</button></td>
			</tr>
			diceButton2 = <tr style={{textAlign: "left"}}>
			<td>Space between dice: </td>
			<td><button className="infoButton" onClick={this.incSpace.bind(this,1,"dice")}>Increase</button></td>
			<td><button className="infoButton" onClick={this.incSpace.bind(this,-1,"dice")}>Decrease</button></td>
			<td><button className="infoButton" onClick={this.incSpace.bind(this,0,"dice")}>Default</button></td>
			</tr>
		}
		return <div><table><tbody>
			<tr style={{textAlign: "left"}}>
			<td>Size of coins: </td>
			<td><button className="infoButton" onClick={this.incSize.bind(this,0.75,"coin")}>Increase</button></td>
			<td><button className="infoButton" onClick={this.incSize.bind(this,1.25,"coin")}>Decrease</button></td>
			<td><button className="infoButton" onClick={this.incSize.bind(this,0,"coin")}>Default</button></td>
			</tr><tr></tr>
			<tr style={{textAlign: "left"}}>
			<td>Space between coins: </td>
			<td><button className="infoButton" onClick={this.incSpace.bind(this,1,"coin")}>Increase</button></td>
			<td><button className="infoButton" onClick={this.incSpace.bind(this,-1,"coin")}>Decrease</button></td>
			<td><button className="infoButton" onClick={this.incSpace.bind(this,0,"coin")}>Default</button></td>
			</tr><tr></tr>
			{marginCoinDice}
			<tr></tr>
			{diceButton1}
			<tr></tr>
			{diceButton2}
			<tr></tr>
			</tbody></table>			
		</div>
	}
}