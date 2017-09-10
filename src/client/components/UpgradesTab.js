import React from "react"
import { connect } from "react-redux"
import "../main.css"
import math from "mathjs"

import { incNumCoins, changeValueCoins, buyTrickCoin } from "../actions/coinActions"
import { incNumDices, changeValueDice, buyTrickDice } from "../actions/diceActions"
import { deleteWelcome } from "../actions/infoBoxActions"

@connect((store) => {
	return {
		coin: store.coin,
		event: store.event,
		dice: store.dice,
		achievements: store.achievements,
		infoBox: store.infoBox,
	};
})

export default class UpgradesTab extends React.Component {

	incNumCoins() {
		if(this.props.event.total >= this.props.coin.prizeNumCoins) this.props.dispatch(incNumCoins(this.props.coin.prizeNumCoins))
	}

	changeValueCoins() {
		if(this.props.event.total >= this.props.coin.prizeValueCoins) {
			const { coin } = this.props;
			if(coin.val === 1) {
				var val = 5;
			}
			else if(coin.val === 5) {
				var val = 10;
			}
			else {
				var val = 20;
			}
			this.props.dispatch(changeValueCoins(val, coin.prizeValueCoins))
		}
	}

	buyTrickCoin() {
		if(this.props.event.total >= this.props.coin.prizeTrickCoins) this.props.dispatch(buyTrickCoin(this.props.coin.prizeTrickCoins))
	}

	incNumDices() {
		if(this.props.event.totalDollar >= this.props.dice.prizeNumDice) this.props.dispatch(incNumDices(this.props.dice.prizeNumDice))
		else if(this.props.dice.numDice == 0) this.props.dispatch(incNumDices(0))
	}

	changeValueDice() {
		if(this.props.event.totalDollar >= this.props.dice.prizeValueDice) {
			const { dice } = this.props;
			if(dice.val === 1) {
				var val = 5;
			}
			else if(dice.val === 5) {
				var val = 10;
			}
			else {
				var val = 20;
			}
			this.props.dispatch(changeValueDice(val, dice.prizeValueDice))
		}
	}

	buyTrickDice() {
		if(this.props.event.totalDollar >= this.props.dice.prizeTrickDice) this.props.dispatch(buyTrickDice(this.props.dice.prizeTrickDice))
	}

	deleteBox() {
		this.props.dispatch(deleteWelcome())
	}

	render () {
		var coin1 = <div></div>
		var coin2 = <div></div>
		var dice1 = <div></div>
		var dice2 = <div></div>
		var dice3 = <div></div>
		var welcome = <div></div>
		if(this.props.infoBox.unlockedUpgrades[0]) {
			if(this.props.achievements.coinTricks != 3) coin1 = <button className="upgradeButton upOrange" onClick={this.buyTrickCoin.bind(this)}>Buy new coin trick ({math.round(this.props.coin.prizeTrickCoins,1)}kr)</button>
			else coin1 = <button className="upGrey">All coin tricks unlocked</button>
		} else {
			coin1 = <button className="upGrey">Unlocked by getting your first blue event</button>
		}
		if(this.props.infoBox.unlockedUpgrades[1]) {
			if(this.props.achievements.coinMultiplier != 20) coin2 = <button className="upgradeButton upOrange" onClick={this.changeValueCoins.bind(this)}>Increase value of coins ({math.round(this.props.coin.prizeValueCoins,1)}kr)</button>
			else coin2 = <button className="upGrey">Coin multiplier maxed out</button>
		} else if(this.props.infoBox.totalFlips > 999){
			coin2 = <button className="upGrey">Unlocked by flipping {5000-this.props.infoBox.totalFlips} more coins</button>
		}
		if(this.props.infoBox.unlockedUpgrades[2]) {
			if(this.props.dice.numDice == 0) dice1 = <button className="upgradeButton upGreen" onClick={this.incNumDices.bind(this)}>Get your first die</button>
			else dice1 = <button className="upgradeButton upGreen" onClick={this.incNumDices.bind(this)}>Buy extra die ({math.round(this.props.dice.prizeNumDice,1)}$)</button>
		} else if(this.props.achievements.achievementsText.length > 0){
			dice1 = <button className="upGrey">Unlocked by getting {10 - this.props.achievements.achievementsText.length} more unique blue events</button>
		}
		if(this.props.infoBox.unlockedUpgrades[3]) {
			dice2 = <button className="upgradeButton upGreen" onClick={this.buyTrickDice.bind(this)}>Buy new dice trick ({math.round(this.props.dice.prizeTrickDice,1)}$)</button>
		} else if(this.props.infoBox.unlockedUpgrades[2]) {
			dice2 = <button className="upGrey">Unlocked by getting {5 - this.props.infoBox.diceEvents} more unique dice events</button>
		}
		if(this.props.infoBox.unlockedUpgrades[4]) {
			dice3 = <button className="upgradeButton upGreen" onClick={this.changeValueDice.bind(this)}>Increase value of dice ({math.round(this.props.dice.prizeValueDice,1)}$)</button>
		} else if(this.props.infoBox.unlockedUpgrades[2]) {
			dice3 = <button className="upGrey">Unlocked by getting {15 - this.props.infoBox.diceEvents} more unique dice events</button>
		}
		if(this.props.infoBox.welcome) {
			welcome = <div className="welcomeBox" style={{bottom : 20}}>
			<div className="xButton" onClick={this.deleteBox.bind(this)}><img src="./images/close.png" style={{maxWidth:"100%", maxHeight:"100%"}}/></div>
			<h2 style={{margin: "10px", textAlign: "center"}}>Welcome to A Game Of Chance!</h2>
			<p style={{margin: "20px", fontWeight: "bold", textAlign: "left"}}>This is a clicker/idle game where you earn money by experiencing unlikely events. For example if an event is 50% likely to happen, you earn 1kr (times multipliers), if it's 1% chance of happening, you earn 50kr (times multipliers). That's all I wanna tell you. The rest you have to experience yourself. I hope you're feeling lucky!</p>
			<p style={{margin: "20px", textAlign: "left"}}>PS: The game looks a bit different depending on the screen size and browser you use. In Settings you can resize objects (as you unlock them), space between objects etc. if it's something you want to change. If you want the sidebar smaller/bigger, just zoom in or out in the browser.</p>
		</div>
		}
		return <div style={{textAlign: "center"}}>
			<button className="upgradeButton upOrange" onClick={this.incNumCoins.bind(this)}>Buy extra coin ({math.round(this.props.coin.prizeNumCoins,1)}kr)</button>
			{coin1}
			{coin2}
			<br></br>
			{dice1}
			{dice2}
			{dice3}
			{welcome}
		</div>
	}
}