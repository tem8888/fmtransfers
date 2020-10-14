
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

    /* При отправке бида, если Бид существует, то перезаписываем новые данные, если нет, то создаем новый объект */
    case 'BID_LIST_UPDATE':
      if (action.payload.isExisting) 
        return {...state, bidList: state.bidList.map((bid) => {

            if(bid.bidId === action.payload.bidData.bidId) {
              bid.curPrice = action.payload.bidData.curPrice
              
            }
            return bid
          })
        }
      else
        return {...state, bidList: [...state.bidList, action.payload.bidData]}

    case 'BID_LATE_ERROR':
      return state


  //  case 'UPDATE_CURRENT_BID':
  //    return action.payload
    
    case 'BID_ERROR':
      return state

    default:
      return state
	}
}

export default bidReducer
