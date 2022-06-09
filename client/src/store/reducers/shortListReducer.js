import fromArrayToObject from '../../helpers/fromArrayToObject'
import { 
	SHORTLIST_LOADED,
	SHORTLIST_ADD,
	SHORTLIST_REMOVE,
	SORT_SHORTLIST,
	SHORTLIST_ERROR,
  SHORTLIST_RESET,
} from '../actions/types'
var omit = require('lodash.omit')

const initialState = {
  list: {},
  sorted: [],
  sortOrder: '',
  sortKey: '',
  loading: true,
  errorMessage: null
}

const shortListReducer = (state = initialState, action) => {
  switch(action.type) {

    /* Загрузка всех игроков добавленных в шортлист определенным клубом */
    case SHORTLIST_LOADED: 
   //   state.list = action.payload
      return { ...state, list: fromArrayToObject(action.payload, 'uid'), loading: false }

    /* Добавляем игрока в шортлист */
    case SHORTLIST_ADD:
        return {
          ...state, 
          list: {...state.list, [action.payload.playerShortlistData.uid]: action.payload.playerShortlistData}
        }

    /* Удаляем игрока из шортлиста */
    case SHORTLIST_REMOVE:
      return {...state, list: omit(state.list, [action.payload])}

    case SORT_SHORTLIST:
      if (state.sortOrder !== 'asc' && action.payload.key === state.sortKey)
        return {
          ...state, 
          sortKey: action.payload.key, 
          sortOrder: 'asc', 
          list: Object.values(state.list).sort((a,b) => b[action.payload.key] - a[action.payload.key])
        }
      else
        return {
          ...state, 
          sortKey: action.payload.key, 
          sortOrder: 'desc', 
          list: Object.values(state.list).sort((a,b) => a[action.payload.key] - b[action.payload.key])
        }

    case SHORTLIST_ERROR:
      return {...state, loading: false, errorMessage: action.payload}

    case SHORTLIST_RESET:
      return {...state, list: {}}

    default:
      return state
	}
}

export default shortListReducer
