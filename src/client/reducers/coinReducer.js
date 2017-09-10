export default function reducer(state={
		numCoins: 1,
		val: 1,
		flipped: false,
		rotation: ["rotateX(0deg)"],
		sides: ["HEADS"],
		prizeNumCoins: 5,
		prizeValueCoins: 1500,
		prizeTrickCoins: 100,
		size: 1,
		space: 1,
	}, action) {

		switch (action.type) {
			case "FLIP": {
				var tempSides = [];
				var tempRotation = [];
				for (var i = 0; i < state.numCoins; i++) {
					if(Math.random() > 0.5) tempSides.push("HEADS");
					else tempSides.push("TAILS");

					if (!state.flipped) tempRotation.push("rotateX(" + Math.floor(Math.random()*4+1)*360 + "deg)");
					else tempRotation.push("rotateX(" + Math.floor(-Math.random()*2+1)*360 + "deg)");
				}
				return {...state, sides: tempSides, flipped: !state.flipped, rotation: tempRotation}
			}
			case "INCNUMCOINS": {
				return {...state, numCoins: state.numCoins + 1, sides: [...state.sides, "HEADS"], rotation: [...state.rotation, "rotateX(0deg)"], prizeNumCoins: state.prizeNumCoins*1.5}
			}
			case "CHANGEVALUECOINS" : {
				return {...state, val: action.val, prizeValueCoins: state.prizeValueCoins*10}
			}
			case "BUYTRICKCOIN" : {
				return {...state, prizeTrickCoins: state.prizeTrickCoins*50}
			}
			case "INCSIZECOINS" : {
				if(action.change === 0) return {...state, size: 1}
				else return {...state, size: state.size*action.change}
			}
			case "INCSPACECOINS" : {
				if(action.change === 0) return {...state, space: 1}
				else return {...state, space: state.space+action.change}
			}
		}
		return state;
};