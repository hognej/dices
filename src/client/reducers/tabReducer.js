export default function reducer(state={
		selected: "upgrades",
	}, action) {

		switch (action.type) {
			case "SWITCH": {
				return {...state, selected: action.tab}
			}
		}
		return state;
};