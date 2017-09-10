export function incNumDices(prize) {
	return {
		type: "INCNUMDICES",
		prize: prize,
	}
}

export function changeValueDice(val, prize) {
	return {
		type: "CHANGEVALUEDICE",
		val: val,
		prize: prize,
	}
}

export function buyTrickDice(prize) {
	return {
		type: "BUYTRICKDICE",
		prize: prize

	}
}