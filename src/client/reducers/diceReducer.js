export default function reducer(state={
		numDice: 0,
		sides: [],
		flipped: false,
		rotation: ["rotateX(0deg) rotateY(0deg)"],
		prizeNumDice: 18.75,
		prizeValueDice: 2000,
		prizeTrickDice: 300,
		val: 1,
		size: 1,
		space: 1,
		margin: 50,
	}, action) {

	switch (action.type) {
		case "FLIP": {
			var tempSides = [];
			var tempRotation = [];
			for (var i = 0; i < state.numDice; i++) {
				var dice = Math.floor(Math.random()*6)+1
				tempSides.push(dice)

				if (!state.flipped) {
					var rotateX = Math.floor(Math.random()*4+1)*360
					var rotateY = Math.floor(Math.random()*-2)*360
				} else {
					var rotateX = Math.floor(Math.random()*-4)*360
					var rotateY = Math.floor(Math.random()*2+1)*360
				}
				if(dice === 2) rotateX -= 90 
				else if(dice === 3) rotateY -= 90
				else if(dice === 4) rotateY += 90
				else if(dice === 5) rotateX += 90
				else if(dice === 6) rotateY += 180
				
				tempRotation.push("rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)");
			}
			return {...state, sides: tempSides, flipped: !state.flipped, rotation: tempRotation}
		}
		case "INCNUMDICES": {
			return {...state, numDice: state.numDice + 1, sides: [...state.sides, 1], rotation: [...state.rotation, "rotateX(0deg) rotateY(0deg)"], prizeNumDice: state.prizeNumDice*1.6}
		}
		case "CHANGEVALUEDICE" : {
				return {...state, val: action.val, prizeValueDice: state.prizeValueDice*10}
		}
		case "BUYTRICKDICE" : {
				return {...state, prizeTrickDice: state.prizeTrickDice*15}
		}
		case "INCSIZEDICES" : {
			if(action.change === 0) return {...state, size: 1}
			else return {...state, size: state.size*action.change}
		}
		case "INCSPACEDICES" : {
			if(action.change === 0) return {...state, space: 1}
			else return {...state, space: state.space+action.change}
		}
		case "INCMARGINDICES" : {
			if(action.change === 0) return {...state, margin: 50}
			else return {...state, margin: state.margin+action.change}
		}
	}
	return state;
}