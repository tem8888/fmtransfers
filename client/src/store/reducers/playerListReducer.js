const initialState = {
  initial: {},
  filtered: {},
}

const playerListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYERS_LOADED':
      state = action.payload
      return { initial: action.payload, filtered: action.payload }

    case 'GET_FULL_LIST':
      return { initial: state.initial, filtered: state.initial }

    case 'FILTER':
      console.log(action.payload.inputFilter.thr.atleast)
      return {
        initial: state.initial,
        filtered: state.initial.filter(
          (player) =>
            player.name.toLowerCase().includes(action.payload.inputFilter.name.toLowerCase()) &&
            player.ca <= (action.payload.inputFilter.ca.atmost || 200) &&
            player.ca >= action.payload.inputFilter.ca.atleast &&
            player.pa <= (action.payload.inputFilter.pa.atmost || 200) &&
            player.pa >= action.payload.inputFilter.pa.atleast &&
            player.age <= (action.payload.inputFilter.age.atmost || 50) &&
            player.age >= action.payload.inputFilter.age.atleast &&
            player.price <= (action.payload.inputFilter.price.atmost || 2000) &&
            player.price >= action.payload.inputFilter.price.atleast &&
            player.preferredfoot.toLowerCase().includes(action.payload.inputFilter.preferredFoot) &&
            (action.payload.inputFilter.position !== 'd' ? player.position.toLowerCase().includes(action.payload.inputFilter.position) : 
            player.position.toLowerCase().startsWith(action.payload.inputFilter.position) && !player.position.toLowerCase().startsWith('dm')) &&
            player.position.toLowerCase().includes(action.payload.inputFilter.side)
        ),
      }

    case 'SORT':
      if (action.payload.orderby === 'asc')
        return {
          ...state,
          filtered: state.filtered.sort(
            (a, b) => a[action.payload.key] - b[action.payload.key]
          ),
        }
      else
        return {
          ...state,
          filtered: state.filtered.sort(
            (a, b) => b[action.payload.key] - a[action.payload.key]
          ),
        }

    case 'BID_PLAYER_STATUS':
      state.filtered.map((player) => {
        if (player.uid === action.payload.uid) {
          player.bidStatus = action.payload.bidStatus
        }
        return player
      })
      return state

    default:
      return state
  }
}

export default playerListReducer
