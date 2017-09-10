import React from "react"
import { connect } from "react-redux"
import "../main.css"
import math from "mathjs"

@connect((store) => {
	return {
		achievements: store.achievements,
		dice: store.dice,
	};
})

export default class EventsTab extends React.Component {

	render () {
		var imgDice = <div></div>
		var displayDice = "none"
		if(this.props.dice.numDice !== 0) {
			imgDice = <img src={"./images/dice6.png"} height="20px"/>
			displayDice = "table-cell"
		}
		const mappedAchievements = this.props.achievements.achievementsText.map(achievement => <tr><th>{achievement[0]}</th><th className="blueText mini">{achievement[1]}</th><th>x{achievement[2]}</th><th style={{display: displayDice}}>x{achievement[3]}</th></tr>)		
		return <div>
			<p className="statsText">Unlocked {this.props.achievements.achievementsText.length} out of 37 blue events:</p>
			<table><tbody><tr><th>Probability</th><th>Description</th><th><img src="./images/1tails.png" height="30px"/></th><th style={{minWidth:"30px", display: displayDice}}>{imgDice}</th></tr>
			{mappedAchievements}</tbody></table>
			
			
		</div>
	}
}