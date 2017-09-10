import { combineReducers } from "redux"

import coin from "./coinReducer.js"
import dice from "./diceReducer.js"
import event from "./eventReducer.js"
import tab from "./tabReducer.js"
import achievements from "./achievementsReducer.js"
import infoBox from "./infoBoxReducer.js"

export default combineReducers({
	coin,
	event,
	tab,
	achievements,
	dice,
	infoBox,
})