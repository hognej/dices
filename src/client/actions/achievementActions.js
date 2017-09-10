export function addAchievement(range, achievement, sort) {
	return {
		type: "ADDACHIEVEMENT",
		range: range,
		achievement: achievement,
		sort: sort,
	}
}