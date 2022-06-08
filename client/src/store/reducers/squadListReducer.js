import {
  SQUAD_PLAYERS_LOADED,
  SHORTLIST_ERROR,
  SORT_SQUAD,
  SELL_SQUAD_PLAYER
} from '../actions/types'

const initiaSquadlState = {
  list: [],
  sort: {key: '', order: ''},
  activeSquadPlayer: {},
  loading: true,
  errorMessage: null
}

const squadListReducer = (state = initiaSquadlState, action) => {
  switch(action.type) {

    case SQUAD_PLAYERS_LOADED:
        return {
          ...state, 
          list: action.payload,
        }

    case SORT_SQUAD:
      if (state.sort.order !== 'asc' && action.payload.key === state.sort.key)
      return {
        ...state, sort: {key: action.payload.key, order: 'asc'}, list: state.list.sort((a,b) => b[action.payload.key] - a[action.payload.key])
      }
    else
      return {
        ...state, sort: {key: action.payload.key, order: 'desc'}, list: state.list.sort((a,b) => a[action.payload.key] - b[action.payload.key])
      }

    case SHORTLIST_ERROR:
      return {...state, loading: false, errorMessage: action.payload}

    case SELL_SQUAD_PLAYER:
      return state

    default:
      return state
	}
}

export default squadListReducer
