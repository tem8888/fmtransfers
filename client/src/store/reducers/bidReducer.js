
const initialState = {
  currentBid: {},
  bidList: {}
}

const bidReducer = (state = initialState, action) => {
  switch(action.type) {

    /* Загрузка всех сделанных бидов */
    case 'BID_LOADED': 
      state.bidList = action.payload
      return state

    /* Загрузка информации о биде выбранного игрока */
    case 'BID_CURRENT_LOADED': 
      state.currentBid = action.payload 
      return state

    /* Добавляем игрока в шортлист */
    case 'BID_LIST_UPDATE':
        return {...state, bidList: [...state.bidList, action.payload.playerShortlistData]}

    /* Удаляем игрока из шортлиста */
    case 'BID_LIST_REMOVE':
     // state.bidList = state.bidList.filter((player) => player.club === action.payload.club && player.uid === action.payload.uid)
      return {...state, bidList: state.bidList.filter((player) => player.club === action.payload.club && player.uid !== action.payload.uid)}
      //  return {...state, bidList: [...state.bidList, action.payload.playerShortlistData]}

    
    case 'SORT_SHORTLIST':
      if (action.payload.orderby === 'asc')
        return {...state, bidList: state.bidList.sort((a,b) => a[action.payload.key] - b[action.payload.key])}
      else
        return {...state, bidList: state.bidList.sort((a,b) => b[action.payload.key] - a[action.payload.key])}

    case 'BID_LATE_ERROR':
      return state

    case 'BID_ERROR':
      return state

    default:
      return state
	}
}

export default bidReducer
