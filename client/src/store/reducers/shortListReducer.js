const initialState = {
  list: {},
  activePlayer: null,
  loading: true
}

const shortListReducer = (state = initialState, action) => {
  switch(action.type) {

    /* Загрузка всех игроков добавленных в шортлист определенным клубом */
    case 'SHORTLIST_LOADED': 
      state.list = action.payload
      return { ...state, loading: false }

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
      if (action.payload.orderby === 'asc')
        return {
          ...state, list: state.list.sort((a,b) => a[action.payload.key] - b[action.payload.key])
        }
      else
        return {
          ...state, 
          list: state.list.sort((a,b) => b[action.payload.key] - a[action.payload.key])
        }

    case 'SHOW_SHORTLIST_PLAYER':
      return {
        ...state, 
        activePlayer: state.list.filter((player) => player.uid === action.payload.playerId)[0]
      }

    case 'SHORTLIST_ERROR':
      return state

    default:
      return state
	}
}

export default shortListReducer
