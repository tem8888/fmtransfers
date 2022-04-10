const initialState = {
  list: {},
  sorted: {},
  sortOrder: '',
  sortKey: '',
  loading: true
}

const shortListReducer = (state = initialState, action) => {
  switch(action.type) {

    /* Загрузка всех игроков добавленных в шортлист определенным клубом */
    case 'SHORTLIST_LOADED': 
   //   state.list = action.payload
      return { ...state, list: action.payload, loading: false }

    /* Добавляем игрока в шортлист */
    case 'SHORTLIST_ADD':
        return {
          ...state, 
          list: [...state.list, action.payload.playerShortlistData]
        }

    /* Удаляем игрока из шортлиста */
    case 'SHORTLIST_REMOVE':
      return {
        ...state, 
        list: state.list.filter((player) => player.club === action.payload.club && player.uid !== action.payload.uid)
      }

    case 'SORT_SHORTLIST':
      if (state.sortOrder !== 'asc' && action.payload.key === state.sortKey)
        return {
          ...state, sortKey: action.payload.key, sortOrder: 'asc', list: state.list.sort((a,b) => b[action.payload.key] - a[action.payload.key])
        }
      else
        return {
          ...state, sortKey: action.payload.key, sortOrder: 'desc', list: state.list.sort((a,b) => a[action.payload.key] - b[action.payload.key])
        }

    case 'SHORTLIST_ERROR':
      return state

    default:
      return state
	}
}

export default shortListReducer
