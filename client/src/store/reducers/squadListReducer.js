const initiaSquadlState = {
  initial: {},
  filtered: {},
  sort: {key: '', order: ''},
  activeSquadPlayer: {}
}

const squadListReducer = (state = initiaSquadlState, action) => {
  switch(action.type) {

    case 'SQUAD_PLAYERS_LOADED':
       // state = action.payload
        return {
          ...state, 
          initial: action.payload, 
          filtered: action.payload
        }

    case 'SORT_SQUAD':
      if (state.sort.order !== 'asc' && action.payload.key === state.sort.key)
      return {
        ...state, sort: {key: action.payload.key, order: 'asc'}, filtered: state.filtered.sort((a,b) => b[action.payload.key] - a[action.payload.key])
      }
    else
      return {
        ...state, sort: {key: action.payload.key, order: 'desc'}, filtered: state.filtered.sort((a,b) => a[action.payload.key] - b[action.payload.key])
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
