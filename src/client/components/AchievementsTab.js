import React from "react"
import { connect } from "react-redux"
import "../main.css"
import math from "mathjs"
import TeX from "react-formula-beautifier"


@connect((store) => {
	return {
		achievements: store.achievements,
		event: store.event,
		dice: store.dice,
	};
})

export default class AchievementsTab extends React.Component {

	render () {

		const mostUnlikelyCoinEvent = this.props.event.mostUnlikelyCoinEvent[1] + " (" + this.props.event.mostUnlikelyCoinEvent[0] + "%)" 
		const mostUnlikelyDiceEvent = this.props.event.mostUnlikelyDiceEvent[1] + " (" + this.props.event.mostUnlikelyDiceEvent[0] + "%)"
		var mostUnlikelyDiceObject = <tr></tr>
		var totalRolled = <tr></tr>
		var diceMulitplier = <tr></tr>
		var diceTricks = <tr></tr>
		var dollarEarned = <tr></tr>
		var dollarUsed = <tr></tr>
		if(this.props.dice.numDice !== 0) {
			dollarEarned = <tr><td className="statsText">Total dollar earned: </td><td>{math.round(this.props.event.totalDollar+this.props.achievements.dollarUsed,1)}</td></tr>
			dollarUsed = <tr><td className="statsText">Total dollar used: </td><td>{math.round(this.props.achievements.dollarUsed,1)}</td></tr>	
			mostUnlikelyDiceObject = <tr><td className="statsText">Most unlikely dice event: </td><td style={{textAlign: "left", maxWidth: "310px"}}>{mostUnlikelyDiceEvent}</td></tr>
			totalRolled = <tr><td className="statsText">Total dice rolled: </td><td>{this.props.achievements.totalRolled}</td></tr>
			diceMulitplier = <tr><td className="statsText">Dice multiplier: </td><td>{this.props.achievements.diceMultiplier}</td></tr>
			diceTricks = <tr><td className="statsText">Dice tricks unlocked: </td><td>{this.props.achievements.diceTricks} out of 4 tricks</td></tr>
		}		
		return <div>
			<table className="statsTable">
				<tbody>
					<tr><td className="statsText">Total button clicks: </td><td>{this.props.achievements.flips}</td></tr>
					<tr><td className="statsText">Total kroner earned: </td><td>{math.round(this.props.event.total+this.props.achievements.krUsed,1)}</td></tr>
					<tr><td className="statsText">Total kroner used: </td><td>{math.round(this.props.achievements.krUsed,1)}</td></tr>
					<tr><td className="statsText">Total coins flipped: </td><td>{this.props.achievements.totalFlips}</td></tr>
					<tr><td className="statsText">Coin multiplier: </td><td>{this.props.achievements.coinMultiplier}</td></tr>
					<tr><td className="statsText">Coin tricks unlocked: </td><td>{this.props.achievements.coinTricks} out of 3 tricks</td></tr>
					<tr><td><br></br></td></tr>
					{dollarEarned}
					{dollarUsed}
					{totalRolled}
					{diceMulitplier}
					{diceTricks}
				</tbody>
			</table>
			<br></br>
			<table className="statsTable">
				<tbody>
					<tr><td className="statsText">Most unlikely coin event: </td><td style={{textAlign: "left", maxWidth: "310px"}}>{mostUnlikelyCoinEvent}</td></tr>
					{mostUnlikelyDiceObject}
					</tbody>
			</table>
		</div>
	}
}