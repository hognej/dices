import React from "react"
import { connect } from "react-redux"
import "../main.css"
import math from "mathjs"

import { addAchievement } from "../actions/achievementActions"

@connect((store) => {
	return {
		event: store.event
	};
})

export default class EventText extends React.Component {
	render () {
		if(this.props.sort == "SUM") {
			var moneyDollar = <div></div>
			if(this.props.event.scoreDollar > 0) {
				moneyDollar = <div className="redText">Total dollar: {math.round(this.props.event.scoreDollar,1)}$</div>
			}
			return <div className="eventText"><b>Total earnings this round</b> <div className="redText">Total kroner: {math.round(this.props.event.scoreKr,1)}kr</div>{moneyDollar}<br></br></div>	
		}
		var ex = "";
		var text = "";
		var range = "";
		if (this.props.chance < 0.000001) {
			ex = "!!!!!!!"
			text = "You just won the Powerball jackpot!!! I don't know what to say... This should never happen! It's just too crazy! The chance of winning the Powerball Jackpot is about 0.00000034% and that's what you have done right know!!!"
			range = "x<0.000001%"
		} else if (this.props.chance < 0.00001) {
			ex = "!!!!!!";
			text = "You won the million dollar prize in Powerball!!! It's about 0.0000085% chance and just experienced something as unlikely as that!!! Just think about it!"
			range = "0.000001%<x<0.00001%"
		} else if (this.props.chance < 0.00005) {
			ex = "!!!!!!";
			text = "You won the Norwegian lottery!!! It's about 0.00002% chance to win it and you actually did it!!! That's crazy!"
			range = "0.00001%<x<0.00005%"
		} else if (this.props.chance < 0.00015) {
			ex = "!!!!!";
			text = "Are you kidding?!! Do you have any idea how unlikely it is to see this message? You could have been a billionaire with your luck! (About 0.0001% of America's population is a billionaire)"
			range = "0.00005%<x<0.00015%"
		} else if (this.props.chance < 0.0005) {
			ex = "!!!!!";
			text = "This just never happens!!! Or does it? Ladbrokes were offering odds of 5000/1 on Leicester to win Premier League in 2015/16. Just saying...  (5000/1 odds is about 0.0002% chance)"
			range = "0.00015%<x<0.0005%"
		} else if (this.props.chance < 0.002) {
			ex = "!!!!"
			text = "Seriously!!! That's about the chance of getting a royal flush in Texas Hold'em! (About 0.0015% chance)"
			range = "0.0005%<x<0.002%"
		} else if (this.props.chance < 0.005) {
			ex = "!!!!"
			text = "Are you serious?!! Sadly this is the probability of becoming a professional athlete. (About 0.004% chance)"
			range = "0.002%<x<0.005%"
		} else if(this.props.chance < 0.01) {
			ex = "!!!";
			text = "HOLY ****! You just actually got struck by lightning! (About 0.008% chance in a lifetime)"
			range = "0.005%<x<0.01%"
		} else if(this.props.chance < 0.015) {
			ex = "!!!";
			text = "WOW!!! That's about as unlikely as getting four of a kind in aces in Texas Hold'em!!! (About 0.013% chance)"
			range = "0.01%<x<0.015%"
		} else if(this.props.chance < 0.04) {
			ex = "!!!";
			text = "Incredible!!! That's about as unlikely as getting a perfect score on the SAT! (About 0.019% chance)"
			range = "0.015%<x<0.04%"
		} else if (this.props.chance < 0.07) {
			ex = "!!!";
			text = "Wow!!! You really are a lucky person!"
			range = "0.04%<x<0.07%"
		} else if(this.props.chance < 0.1) {
			ex = "!!!";
			text = "That's incredible! Buy yourself a lottery ticket! Now!"
			range = "0.07%<x<0.1%"
		} else if (this.props.chance < 0.12) {
			ex = "!!!";
			text = "You know you are a lucky person, right?"
			range = "0.1%<x<0.12%"
		} else if (this.props.chance < 0.14) {
			ex = "!!!"
			text = "This is almost ridiculous! This happens so rarely, but it just happened to you."
			range = "0.12%<x<0.14%"
		} else if (this.props.chance < 0.18) {
			ex = "!!";
			text = "That's as unlikely as getting four of a kind in Texas Hold'em! (About 0.17% chance)"
			range = "0.14%<x<0.18%"
		} else if (this.props.chance < 0.25) {
			ex = "!!";
			text = "That's as unlikely as being born with extra fingers or toes! (About 0.2% chance)"
			range = "0.18%<x<0.25%"
		} else if (this.props.chance < 0.3) {
			ex = "!!"
			text = "You lucky bastard!! You should take a moment to think about how unlikely this is..."
			range = "0.25%<x<0.3%"
		} else if (this.props.chance < 0.5) {
			ex = "!!";
			text = "You just got dealt aces! (Chance of getting dealt pocket aces in Texas Hold'em is about 0.45%)"
			range = "0.3%<x<0.5%"
		} else if (this.props.chance < 0.7) {
			ex = "!!"
			text = "WOW, that's what I call luck!";
			range = "0.5%<x<0.7%"
		} else if (this.props.chance < 1) {
			ex = "!!"
			text = "I really don't know what to say..."
			range = "0.7%<x<1%"
		} else if (this.props.chance < 1.25) {
			ex = "!!"
			text = "That's about as unlikely as a man to be a virgin at age 40! (About 1.2% chance)"
			range = "1%<x<1.25%"
		} else if(this.props.chance < 1.5) {
			ex = "!!"
			text = "That's about as unlikely as getting a yatzy with 5 dices in one throw! (About 1.3% chance)"
			range = "1.25%<x<1.5%"
		} else if (this.props.chance < 1.8) {
			ex = "!"
			text = "Did you know that it's about 1.7% chance to get twins during a pregnancy?"
			range = "1.5%<x<1.8%"
		} else if (this.props.chance < 2.3) {
			ex = "!"
			text = "That's about the odds a person will meet the requirements for Mensa (2% chance)"
			range = "1.8%<x<2.3%"
		} else if (this.props.chance < 3) {
			ex = "!"
			text = "That's about as unlikely as getting an exact number in roulette! (About 2.6% chance)"
			range = "2.3%<x<3%"
		} else if (this.props.chance < 3.5) {
			ex = "!"
			text = "That's actually really unlikely!"
			range = "3%<x<3.5%"
		} else if (this.props.chance < 4) {
			ex = "!"
			text = "Really?!"
			range = "3.5%<x<4%"
		} else if (this.props.chance < 4.7) {
			ex = "!"
			text = "That's about as unlikely as getting yatzy in three throws! (About 4.6% chance)"
			range = "4%<x<4.7%"
		} else if (this.props.chance < 5) {
			ex = "!"
			text = "That's about as unlikely as getting blackjack from drawing the two first cards! (About 4.8% chance)"
			range = "4.7%<5%"
		} else if (this.props.chance < 5.5) {
			ex = "!"
			text = "That's about as unlikely as getting a green number in roulette! (About 5.3% chance)"
			range = "5%<x<5.5%"
		} else if (this.props.chance < 6) {
			ex = "!"
			text = "That's about as unlikely as getting dealt a pocket pair in Texas Hold'em! (About 5.9% chance)"
			range = "5.5%<x<6%"
		} else if (this.props.chance < 6.5) {
			ex = "!"
			text = "That sure is unlikely"
			range = "6%<x<6.5%"
		} else if (this.props.chance < 7) {
			ex = "!"
			text = "You don't see that every day..."
			range = "6.5%<x<7%"
		} else if (this.props.chance < 7.5) {
			ex = "!"
			text = "1 in 14 children in the US have at least one parent behind bars... :( (About 7.1% chance)"
			range = "7%<x<7.5%"
		} else if(this.props.chance < 8) {
			ex = "!";
			text = "That's about the probabilty of being murdered in El Salvador. Sorry! (About 7.8% chance in a lifetime)"
			range = "7.5%<x<8%"
		} else if (this.props.chance < 9) {
			ex = "!"
			text = "Well... Sometimes lucky?"
			range = "8%<x<9%"
		} else if(this.props.chance < 10) {
			ex = "!";
			text = "That's quite unlikely";
			range = "9%<x<10%"
		}
		if(text !== "") {
			this.props.dispatch(addAchievement(range, text, this.props.sort))
		}
		var unit = "kr"
		if(this.props.sort == "DICE") {
			unit = "$"
		}
		return <div className="eventText">
					<div className="boldText"><b>{this.props.boldText}{ex}</b></div>
					<div>(Chance: {this.props.chance}%)</div>
					<div className="bluetext">{text}</div>
					<div className="redText">Money: {this.props.money}{unit}</div>
				</div>	
	}
}