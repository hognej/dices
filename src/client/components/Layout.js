import React from "react"
import { connect } from "react-redux"
import Sidebar from "react-sidebar"
import "../main.css"
import math from "mathjs"
import TeX from "react-formula-beautifier"

import Tabs from "./Tabs.js"
import InfoBox from "./InfoBox.js"
import Coin from "./Coin.js"
import Dice from "./Dice.js"
import EventText from "./EventText.js"
import { incNumCoins, changeValueCoins } from "../actions/coinActions"
import { flip, updateEvent } from "../actions/eventActions"

@connect((store) => {
	return {
		coin: store.coin,
		dice: store.dice,
		event: store.event,
		infoBox: store.infoBox,
		achievements: store.achievements,
	};
})
export default class Layout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {sidebarOpen: true, sidebarDocked: true};
	}

	onSetSidebarOpen(open) {
		this.setState({sidebarOpen: open});
	}

	componentWillMount() {
		var mql = window.matchMedia(`(min-width: 800px)`);
		mql.addListener(this.mediaQueryChanged);
		this.setState({mql: mql, sidebarDocked: mql.matches});
	}

	componentWillUnmount() {
		this.state.mql.removeListener(this.mediaQueryChanged);
	}

	mediaQueryChanged() {
		this.setState({sidebarDocked: this.state.mql.matches});
	}

	flipCoins() {
		this.props.dispatch(flip())
		setTimeout(() => {
  			this.props.dispatch(updateEvent(this.props.coin.sides, this.props.coin.val, this.props.dice.sides, this.props.dice.val));
		}, 100)
		setTimeout(() => {
  			this.forceUpdate();
		}, 900)
	}

	render () {
		const { coin, event, dice, infoBox } = this.props;
		var textDollar = <div></div>
		const mappedInfoBox = infoBox.eventBoxText.map((info, num) => <InfoBox  info = {info} num = {num} />);
		const mappedCoins = coin.sides.map((side, num) => <Coin side = {side} rotation = {coin.rotation[num]} value = {coin.val} size = {coin.sides.length*coin.size} space = {coin.space}/>);
		const mappedDice = dice.sides.map((side, num) => <Dice side = {side} rotation = {dice.rotation[num]} value = {dice.val} size = {dice.sides.length*dice.size} space = {dice.space} />);
		const mappedText = event.eventLog.map(event => <EventText sort= {event[0]} chance = {event[2]} money = {event[3]} boldText = {event[4]} />);
		if(mappedText.length > 0) {
			mappedText.push(<EventText sort = "SUM" />)
		}
		if(this.props.achievements.achievementsText.length > 9) {
			textDollar = <p className="totalText">Total dollar: {math.round(this.props.event.totalDollar,1)}$&nbsp;&nbsp;&nbsp;&nbsp;</p>
		}
		const sidebarContent = <div className="eventsBar">
				<p className="totalText">Total kroner: {math.round(this.props.event.total,1)}kr&nbsp;&nbsp;&nbsp;&nbsp;</p>
				{textDollar}
				<button className="button" onClick={this.flipCoins.bind(this)}>Flip</button>
				<br></br>
				<br></br>
				{mappedText.reverse()}
				{mappedInfoBox}
			</div>;
		const sidebarContent2 = <Tabs />
		return (
			<div>
				<div>{sidebarContent2}</div>
				<div>{sidebarContent}</div>
				<div className="board">
				{mappedCoins}
				<div className="dices" style={{marginTop: this.props.dice.margin}}>{mappedDice}</div>
				</div>
			</div>
		);
	}
}