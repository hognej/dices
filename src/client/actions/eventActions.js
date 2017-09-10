export function flip() {
	return {
		type: "FLIP",
	}
}

export function updateEvent(sides, val, diceSides, diceVal) {
	return {
		type: "UPDATEEVENT",
		sides: sides,
		val: val,
		diceSides: diceSides,
		diceVal: diceVal
	}
}