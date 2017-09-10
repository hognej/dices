import math from "mathjs"

export default function reducer(state={
		total: 10000000,
		totalDollar: 10000000,
		scoreKr: 0,
		scoreDollar: 0,
		eventLog: [],
		coinTrick: 1,
		diceTrick: 1,
		mostUnlikelyCoinEvent: [100, ""],
		mostUnlikelyDiceEvent: [100, ""],
		sequenceFormulaDictionary: {},
	}, action) {

		switch (action.type) {
			case "FLIP": {
				return {...state, eventLog: []}
			}
			case "INCNUMCOINS": {
				return {...state, total: state.total-action.prize}
			}
			case "CHANGEVALUECOINS" : {
				return {...state, total: state.total-action.prize}
			}
			case "BUYTRICKCOIN" : {
				return {...state, coinTrick : state.coinTrick+1, total: state.total-action.prize}
			}
			case "INCNUMDICES": {
				return {...state, totalDollar: state.totalDollar-action.prize}
			}
			case "CHANGEVALUEDICE" : {
				return {...state, totalDollar: state.totalDollar-action.prize}
			}
			case "BUYTRICKDICE" : {
				return {...state, diceTrick : state.diceTrick+1, totalDollar: state.totalDollar-action.prize}
			}
			case "UPDATEEVENT": {
				var numHeads = 0;
				var numTails = 0;
				var tempEventLog = [];
				var tempScoreKr = 0;
				var tempScoreDollar = 0;
				var temp
				for (var i = 0; i < action.sides.length; i++) {
					if(action.sides[i] === "HEADS") {
						numHeads++;
					}
					else {
						numTails++;	
					}
				}

				if(numHeads >= numTails) {
					var chance = (100*(math.combinations(action.sides.length, numHeads)/Math.pow(2, action.sides.length))).toPrecision(4);
					var money = math.round((((Math.pow(2, action.sides.length)/math.combinations(action.sides.length, numHeads)))/2)*action.val,1);
					var boldText = "You got exactly " + numHeads + " heads out of " + action.sides.length + " coins";
					tempEventLog.push(["COIN", numHeads, chance, money, boldText]);
					tempScoreKr += money;
				} else {
					var chance = (100*(math.combinations(action.sides.length, numTails)/Math.pow(2, action.sides.length))).toPrecision(4);
					var money = math.round(((Math.pow(2, action.sides.length)/math.combinations(action.sides.length, numTails))/2)*action.val,1);
					var boldText = "You got exactly " + numTails + " tails out of " + action.sides.length + " coins";
					tempEventLog.push(["COIN", numTails, chance, money, boldText]);
					tempScoreKr += money;
				}

				if(state.coinTrick > 1) {
					var maxSwitches = 1;
					var switches = 1;
					var last = action.sides[0];
					for (var i = 1; i < action.sides.length; i++) {
						if(action.sides[i] !== last) {
							switches++;
						} else {
							if(maxSwitches<switches){
								maxSwitches = switches
							}
							switches = 1;
						}
						last = action.sides[i];
					}
					if(maxSwitches<switches){
						maxSwitches = switches
					}
					var chance = (100*(sequenceFormula(action.sides.length-1, maxSwitches-1)-sequenceFormula(action.sides.length-1, maxSwitches))).toPrecision(4);
					var money = math.round(1/(chance/100)/2*action.val,1);
					if(chance == 100) {
						money = 0
					}
					var boldText = "You got exactly " + maxSwitches + " alternating sides in a row out of " + action.sides.length + " coins";
					tempEventLog.push(["COIN", maxSwitches, chance, money, boldText])
					tempScoreKr += money;
				}

				if(state.coinTrick > 2) {
					var maxRow = 1;
					var tempRow = 0;
					var last = "";
					for (var i = 0; i < action.sides.length; i++) {
						if(action.sides[i] === "HEADS") {
							if(last === "HEADS") {
								tempRow++;
							} else {
								if(maxRow<tempRow) maxRow = tempRow;
								tempRow = 1;
							}
							last = "HEADS";
						} else {
							if(last === "TAILS") {
								tempRow++;
							} else {
								if(maxRow<tempRow) maxRow = tempRow;
								tempRow = 1;
							}
							last = "TAILS";
						}
					}
					if(maxRow<tempRow) maxRow = tempRow;

					var chance = (100*(sequenceFormula(action.sides.length, maxRow)-sequenceFormula(action.sides.length, maxRow+1))).toPrecision(4);
					var money = math.round(1/(chance/100)/2*action.val,1);
					var boldText = "You got exactly " + maxRow + " consecutive " + last.toLowerCase() + " out of " + action.sides.length + " coins";
					tempEventLog.push(["COIN", maxRow, chance, money, boldText])
					tempScoreKr += money;
				}

				var newMostUnlikelyCoinEvent = state.mostUnlikelyCoinEvent
				for (var i = 0; i < tempEventLog.length; i++) {
					if((parseFloat(tempEventLog[i][2])) < parseFloat(newMostUnlikelyCoinEvent[0])) {
						newMostUnlikelyCoinEvent = [tempEventLog[i][2], tempEventLog[i][4]]
					}
				}
				var coinLen = tempEventLog.length 

				if(action.diceSides.length > 0) {
					var dices = {}

					for (var i = 0; i < action.diceSides.length; i++) {
						if(dices[action.diceSides[i]]) {
							dices[action.diceSides[i]] += 1
						} else {
							dices[action.diceSides[i]] = 1
						}
					}
						
					var minNumber = 7;
					for (var i in dices) {
						if(i < minNumber) {
							minNumber = i
						}
					}
					var chance = (100*(Math.pow((7-minNumber)/6,action.diceSides.length))).toPrecision(4)
					var money = math.round(1/(chance/100)/2*action.diceVal,1)
					if(chance == 100) {
						money = 0
					}
					var boldText = "You got all " + action.diceSides.length + " dices with face value " + minNumber + "+";
					tempEventLog.push(["DICE", minNumber, chance, money, boldText]);
					tempScoreDollar += money;					

					if(state.diceTrick > 1) {
						var max = 0;
						var number = 0;
						for (var i in dices) {
							if(dices[i] > max) {
								max = dices[i]
								number = i
							}
						}
						var chance = (100*(math.combinations(action.diceSides.length, max)*Math.pow(1/6, max)*Math.pow(5/6,action.diceSides.length-max))).toPrecision(4);
						var money = math.round(1/(chance/100)/2*action.diceVal,1);
						var textNumber = "";
						if(number == 1) textNumber = "ones"
						else if(number == 2) textNumber = "twos"
						else if(number == 3) textNumber = "threes"
						else if(number == 4) textNumber = "fours"
						else if(number == 5) textNumber = "fives"
						else if(number == 6) textNumber = "sixes"
						var boldText = "You got exactly " + max + " " + textNumber + " out of " + action.diceSides.length + " dices";
						tempEventLog.push(["DICE", max, chance, money, boldText]);
						tempScoreDollar += money;		
					}

					if(state.diceTrick > 2) {
						var sum = 0;
						for (var i = 0; i < action.diceSides.length; i++) {
							sum += action.diceSides[i]
						}
						var chance = (100*sumFunction(action.diceSides.length, sum)).toPrecision(4)
						var money = math.round(1/(chance/100)/2*action.diceVal,1)
						var boldText = "You got exactly " + sum + " pips out of " + action.diceSides.length*6 + " with " + action.diceSides.length + " dices";
						tempEventLog.push(["DICE", sum, chance, money, boldText]);
						tempScoreDollar += money;
					}

					if(state.diceTrick > 3) {
						var last = action.diceSides[0]
						var seq = 1
						for (var i = 1; i < action.diceSides.length; i++) {
							if(last == action.diceSides[i]) {
								break
							} else {
								last = action.diceSides[i]
								seq += 1
							}
						}
						var chance = (100*Math.pow(5/6, seq-1)).toPrecision(4)
						var money = math.round(1/(chance/100)/2*action.diceVal,1)
						if(chance == 100) {
							money = 0
						}
						var boldText = "Your " + seq + " first dice have no two consecutive identical dice"
						tempEventLog.push(["DICE", seq, chance, money, boldText])
						tempScoreDollar += money;
					}
					if(state.diceTrick > 4) {
						dict = {};
						for (var i = 0; i < action.diceSides.length; i++) {
							console.log(action.diceSides[i]);
						}
					}
					
				}

				var newMostUnlikelyDiceEvent = state.mostUnlikelyDiceEvent
				for (var i = coinLen; i < tempEventLog.length; i++) {
					if((parseFloat(tempEventLog[i][2])) < parseFloat(newMostUnlikelyDiceEvent[0])) {
						newMostUnlikelyDiceEvent = [tempEventLog[i][2], tempEventLog[i][4]]
					}
				}
				return {...state, eventLog: tempEventLog.reverse(), scoreKr: tempScoreKr, scoreDollar: tempScoreDollar, total: math.round(state.total+tempScoreKr,1), totalDollar: math.round(state.totalDollar+tempScoreDollar,1),  mostUnlikelyCoinEvent: newMostUnlikelyCoinEvent, mostUnlikelyDiceEvent: newMostUnlikelyDiceEvent}
			}	
		}	
		return state;

	function sequenceFormula(N, k) {
		var key = N.toString() + "," + k.toString()
		if(N<k){
			return 0;
		} else if(state.sequenceFormulaDictionary[key]) {
			return state.sequenceFormulaDictionary[key]
		} else if(N==k){
			return 1/Math.pow(2,N)
		}
		var solution = sequenceFormula(N-1,k) + (1-sequenceFormula(N-k-1,k))*Math.pow(0.5,k+1)
		state.sequenceFormulaDictionary[key] = solution
		return solution
	}

	function sumFunction(n, p) {
		const k = Math.floor((p-n)/6)
		var sum = 0;
		for (var i = 0; i < k+1; i++) {
			sum += Math.pow(-1,i)*math.combinations(n,i)*math.combinations(p-6*i-1,n-1)	
		}
		sum *= (1/Math.pow(6,n))
		return sum
	}
};