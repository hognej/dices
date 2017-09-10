import React from "react"

export default function reducer(state={
		totalFlips : 0,
		unlockedUpgrades : [false,false,false,false,false,false,false,false],
		unlockedTricks : [false,false,false],
		unlockedDiceTricks : [false,false,false,false],
		achievementsText : [],
		eventBoxText : [],
		coinTricksText: [],
		diceTricksText: [],
		diceEvents : 0,
		firstDiceTrick: true,
		welcome: true,
	}, action) {

		switch (action.type) {
			case "UPDATEEVENT" : {
				if(!state.unlockedTricks[0] && state.totalFlips > -1) {
					state.eventBoxText.push(["newCoinTrickEvent", "c1", "This trick counts how many number of heads/tails you got out of the total number of coins you have."])
					state.coinTricksText.push(["newCoinTrickEvent", "c1", "This trick counts how many number of heads/tails you got out of the total number of coins you have."])
					state.unlockedTricks[0] = true
				}
				if(state.totalFlips+action.sides.length > 4999 && !state.unlockedUpgrades[1]) {
					state.eventBoxText.push(["newUpgradeEvent", "Flipped a total of 5000 coins", "You can now increase the value of your coins."])
					state.unlockedUpgrades[1] = true
				}
				if(!state.unlockedDiceTricks[0] && state.unlockedUpgrades[2]) {
					if(state.firstDiceTrick) {
						state.firstDiceTrick = false 
					} else {
						state.eventBoxText.push(["newDiceTrickEvent", <p>You got all <i>n</i> dices with face value <i>k</i>+</p>, <TeX value="$P(n,k)= (\frac{7-k}{6})^n$" />, "This trick finds the lowest face value k and calculates the probability that all your dices is above or equal k."])
						state.diceTricksText.push(["newDiceTrickEvent", <p>You got all <i>n</i> dices with face value <i>k</i>+</p>, <TeX value="$P(n,k)= (\frac{7-k}{6})^n$" />, "This trick finds the lowest face value k and calculates the probability that all your dices is above or equal k."])
						state.unlockedDiceTricks[0] = true
					}
				}
				return {...state, totalFlips : state.totalFlips+action.sides.length}
			}
			case "ADDACHIEVEMENT" : {
				var newAchievementText = state.achievementsText
				var newEventBoxText = state.eventBoxText;
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
					newEventBoxText.push(["newBlueEvent", action.range, action.achievement])
				}
				if(newAchievementText.length == 1 && !state.unlockedUpgrades[0]) {
					state.eventBoxText.push(["newUpgradeEvent", "Experienced your first unlikely blue event! (Event with less than 10% chance of happening)", "You can now buy more coin tricks."])
					state.unlockedUpgrades[0] = true
				}
				if(newAchievementText.length == 10 && !state.unlockedUpgrades[2]) {
					state.eventBoxText.push(["newUpgradeEvent", "Experienced 10 unique unlikely blue events!", "You have unlocked your first die. To buy more dice you can't use kroners anymore. You need dollars!"])
					state.unlockedUpgrades[2] = true
				}
				var diceEvents = 0
				if(state.unlockedUpgrades[2] && !state.unlockedUpgrades[4]) {
					for (var i = 0; i < state.achievementsText.length; i++) {
						if(state.achievementsText[i][3] != 0) diceEvents++
					}
					if(diceEvents > 4 && !state.unlockedUpgrades[3]) {
						state.eventBoxText.push(["newUpgradeEvent", "Experienced 5 unique blue events with dice", "You can now buy more dice tricks."])
						state.unlockedUpgrades[3] = true
					}
					if(diceEvents > 14) {
						state.eventBoxText.push(["newUpgradeEvent", "Experienced 15 unique blue events with dice", "You can now increase the value of your dice"])
						state.unlockedUpgrades[4] = true
					}
				}
				return {...state, achievementsText : newAchievementText, eventBoxText : newEventBoxText, diceEvents: diceEvents}
			}
			case "DELETEEVENTBOXTEXT" : {
				state.eventBoxText.splice(action.num,action.num+1)
				return {...state}
			}
			case "DELETEWELCOME" : {
				state.welcome = false
				return {...state}
			}
			case "BUYTRICKCOIN" : {
				if(!state.unlockedTricks[1]) {
					state.eventBoxText.push(["newCoinTrickEvent", <p>You got exactly <i>k</i> consecutive alternating sides out of <i>n</i> coins</p>, <TeX value="$P(n,k)= f(n-1,k-1)-f(n-1,k), \\ f(n,k) = ... \text{Too long, check Tricks tab}$" />, "This trick counts the longest sequence of alternating heads and tails you got. They must be consecutive. Two equal sides in a row would stop the sequence."])
					state.coinTricksText.push(["newCoinTrickEvent", <p>You got exactly <i>k</i> consecutive alternating sides out of <i>n</i> coins</p>, <TeX value="$P(n,k)= f(n-1,k-1)-f(n-1,k), \\ f(n,k) = \begin{cases} f(n-1,k)+(1-f(n-k-1,k))*\frac{1}{2^{k+1}}, & n>k \\ \frac{1}{2^n}, & n=k \\ 0, & n<k \end{cases}$" />, "This trick counts the longest sequence of alternating heads and tails you got. They must be consecutive. Two equal sides in a row would stop the sequence."])
					state.unlockedTricks[1] = true
				} else if(!state.unlockedTricks[2]) {
					state.eventBoxText.push(["newCoinTrickEvent", <p>You got exactly <i>k</i> consecutive heads/tails out of <i>n</i> coins</p>, <TeX value="$P(n,k)= f(n,k)-f(n,k+1), \\ f(n,k) = ... \text{Too long, check Tricks tab}$" />, "This trick counts the longest sequence of heads/tails you got. They must be consecutive. An alternate side would stop the sequence."])
					state.coinTricksText.push(["newCoinTrickEvent", <p>You got exactly <i>k</i> consecutive heads/tails out of <i>n</i> coins</p>, <TeX value="$P(n,k)= f(n,k)-f(n,k+1), \\ f(n,k) = \begin{cases} f(n-1,k)+(1-f(n-k-1,k))*\frac{1}{2^{k+1}}, & n>k \\ \frac{1}{2^n}, & n=k \\ 0, & n<k \end{cases}$" />, "This trick counts the longest sequence of heads/tails you got. They must be consecutive. An alternate side would stop the sequence."])
					state.unlockedTricks[2] = true
				}
				return {...state}
			}
			case "BUYTRICKDICE" : {
				if(!state.unlockedDiceTricks[1]) {
					state.eventBoxText.push(["newDiceTrickEvent", <p>You got exactly <i>k</i> ones/twos/threes/fours/fives/sixes <br></br> out of <i>n</i> dices</p>, <TeX value="$P(n,k)= \binom nk*\frac{1}{6^k}*\frac{5}{6^{n-k}}$" />, "This trick counts how many number of ones, twos, threes, fours, fives or sixes you got out of the total number of dices you have."])
					state.diceTricksText.push(["newDiceTrickEvent", <p>You got exactly <i>k</i> ones/twos/threes/fours/fives/sixes <br></br> out of <i>n</i> dices</p>, <TeX value="$P(n,k)= \binom nk*\frac{1}{6^k}*\frac{5}{6^{n-k}}$" />, "This trick counts how many number of ones, twos, threes, fours, fives or sixes you got out of the total number of dices you have."])
					state.unlockedDiceTricks[1] = true
				} else if(!state.unlockedDiceTricks[2]) {
					state.eventBoxText.push(["newDiceTrickEvent", <p>You got exactly <i>p</i> pips <br></br> out of 6<i>n</i> with <i>n</i> dices</p>, <TeX value="$P(n,p) = \\ \frac{1}{6^n}\sum_{k=0}^{\left \lfloor{{(p-n)/6}}\right \rfloor}{(-1)}^k \binom nk \binom{p-6k-1}{n-1}$" />, "This trick counts the total number of pips (dots) on all the dice."])
					state.diceTricksText.push(["newDiceTrickEvent", <p>You got exactly <i>p</i> pips out of 6<i>n</i> with <i>n</i> dices</p>, <TeX value="$P(n,p) = \frac{1}{6^n}\sum_{k=0}^{\left \lfloor{{(p-n)/6}}\right \rfloor}{(-1)}^k \binom nk \binom{p-6k-1}{n-1}$" />, "This trick counts the total number of pips (dots) on all the dice."])
					state.unlockedDiceTricks[2] = true
				} else if(!state.unlockedDiceTricks[3]) {
					state.eventBoxText.push(["newDiceTrickEvent", <p>Your <i>k</i> first dice have no two consecutive identical dice</p>, <TeX value="$P(k) = \frac{5}{6^{k-1}}$" />, "This trick always counts from the beginning and stops if there are two consecutive dice with same face value."])
					state.diceTricksText.push(["newDiceTrickEvent", <p>Your <i>k</i> first dice have no two consecutive identical dice</p>, <TeX value="$P(k) = \frac{5}{6^{k-1}}$" />, "This trick always counts from the beginning and stops if there are two consecutive dice with same face value."])
					state.unlockedDiceTricks[3] = true
				}

				return {...state}
			}
		}
		return state;
};