export function incNumCoins(prize) {
	return {
		type: "INCNUMCOINS",
		prize: prize,
	}
}

export function changeValueCoins(val, prize) {
	return {
		type: "CHANGEVALUECOINS",
		val: val,
		prize: prize,
	}
}

export function buyTrickCoin(prize) {
	return {
		type: "BUYTRICKCOIN",
		prize: prize

	}
}