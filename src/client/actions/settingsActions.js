export function incSize(change, instance) {
	if(instance === "coin") {
		return {
			type: "INCSIZECOINS",
			change: change,
		}
	} else if(instance === "dice") {
		return{
			type: "INCSIZEDICES",
			change: change,
		}
	}
}

export function incSpace(change, instance) {
	if(instance === "coin") {
		return {
			type: "INCSPACECOINS",
			change: change,
		}
	} else if(instance === "dice") {
		return{
			type: "INCSPACEDICES",
			change: change,
		}
	}
}

export function incMargin(change, instance) {
	if(instance === "dice") {
		return{
			type: "INCMARGINDICES",
			change: change,
		}
	}
}