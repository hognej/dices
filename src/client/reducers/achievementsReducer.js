export default function reducer(state={
		flips : 0,
		totalFlips : 0,
		totalRolled : 0,
		krUsed : 0,
		dollarUsed : 0,
		achievementsText : [],
		coinMultiplier : 1,
		coinTricks : 1,
		diceMultiplier : 1,
		diceTricks : 1,
	}, action) {

		switch (action.type) {
			case "INCNUMCOINS": {
				return {...state, krUsed: state.krUsed+action.prize}
			}
			case "CHANGEVALUECOINS" : {
				return {...state, krUsed: state.krUsed+action.prize, coinMultiplier : action.val}
			}
			case "BUYTRICKCOIN" : {
				return {...state, krUsed: state.krUsed+action.prize, coinTricks : state.coinTricks + 1}
			}
			case "INCNUMDICES": {
				return {...state, dollarUsed: state.dollarUsed+action.prize}
			}
			case "CHANGEVALUEDICE" : {
				return {...state, dollarUsed: state.dollarUsed+action.prize, diceMultiplier : action.val}
			}
			case "BUYTRICKDICE" : {
				return {...state, dollarUsed: state.dollarUsed+action.prize, diceTricks : state.diceTricks + 1}
			}
			case "UPDATEEVENT" : {
				return {...state, flips : state.flips+1, totalFlips : state.totalFlips+action.sides.length, totalRolled : state.totalRolled+action.diceSides.length}
			}
			case "ADDACHIEVEMENT" : {
				var newAchievementText = state.achievementsText
				var newEventAchievementText = state.eventAchievementText;
				var found = false
				for (var i = 0; i < state.achievementsText.length; i++) {
					if(state.achievementsText[i][1] == action.achievement) {
						if(action.sort == "COIN") state.achievementsText[i][2]++
						else if(action.sort == "DICE") state.achievementsText[i][3]++
						found = true
						break
					}
				}
				if(!found) {
					if (action.sort == "COIN") newAchievementText.push([action.range, action.achievement, 1, 0])
					else if (action.sort == "DICE") newAchievementText.push([action.range, action.achievement, 0, 1])
					newAchievementText.sort()
				}
				return {...state, achievementsText : newAchievementText}
			}
		}
		return state;
};