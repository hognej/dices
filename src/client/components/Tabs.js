import React from "react"
import { connect } from "react-redux"
import "../main.css"

import { switchTab } from "../actions/tabActions"

import UpgradesTab from "./UpgradesTab.js"
import AchievementsTab from "./AchievementsTab.js"
import SettingsTab from "./SettingsTab.js"
import EventsTab from "./EventsTab.js"
import TricksTab from "./TricksTab.js"


@connect((store) => {
	return {
		tab: store.tab,
	};
})
export default class Tabs extends React.Component {

	selectTab(tab) {
		this.props.dispatch(switchTab(tab));
	}
	render () {
		var classUpgrades = "tab", classAchievements = "tab", classSettings = "tab", classEvents = "tab", classTricks = "tab";
		var show = <div />
		if(this.props.tab.selected === "upgrades"){
			classUpgrades += " selected";
			show = <UpgradesTab />
		} else if(this.props.tab.selected === "achievements") {
			classAchievements += " selected";
			show = <AchievementsTab />
		} else if(this.props.tab.selected === "events") {
			classEvents += " selected";
			show = <EventsTab/>
		} else if(this.props.tab.selected === "settings") {
			classSettings += " selected";
			show = <SettingsTab />
		} else if(this.props.tab.selected === "tricks") {
			classTricks += " selected";
			show = <TricksTab />
		}
		return <div className="sideBar" style={{textAlign: "center", minWidth: "500px"}}>
			<button id="upgrades" className={classUpgrades} onClick={this.selectTab.bind(this, "upgrades")}>Upgrades</button>
			<button id="achievements" className={classAchievements} onClick={this.selectTab.bind(this, "achievements")}>Statistics</button>
			<button id="events" className={classEvents} onClick={this.selectTab.bind(this, "events")}>Events</button>
			<button id="tricks" className={classTricks} onClick={this.selectTab.bind(this, "tricks")}>Tricks</button>
			<button id="settings" className={classSettings} onClick={this.selectTab.bind(this, "settings")}>Settings</button>
			<div className="hr"></div>
			<br></br>
			{show}
		</div>
	}
}