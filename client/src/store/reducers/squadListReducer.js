const initiaSquadlState = {
  initial: {},
  filtered: {},
  activeSquadPlayer: {}
}

const squadListReducer = (state = initiaSquadlState, action) => {
  switch(action.type) {

    case 'SQUAD_PLAYERS_LOADED':
        state = action.payload
        return {
          ...state, 
          initial: action.payload, 
          filtered: action.payload
        }

    case 'SORT_SQUAD':
    	if (action.payload.orderby === 'asc')
    		return {
          ...state, 
          filtered: state.filtered.sort((a,b) => a[action.payload.key] - b[action.payload.key])
        }
    	else
    		return {
          ...state, 
          filtered: state.filtered.sort((a,b) => b[action.payload.key] - a[action.payload.key])
        }

    case 'SELL_SQUAD_PLAYER':
      return {
        ...state, 
        initial: action.payload, 
        filtered: action.payload
      }

    default:
      return state
	}
}

export default squadListReducer
