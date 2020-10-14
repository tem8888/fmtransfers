const squadListReducer = (state = {initial:{}, filtered:{}}, action) => {
  switch(action.type) {

    case 'SQUAD_PLAYERS_LOADED':
        state = action.payload
        return {initial: action.payload, filtered: action.payload}
    
    case 'GET_FULL_SQUAD':
      return {initial: state.initial, filtered: state.initial}

    case 'FILTER_SQUAD': 
    return {initial: state.initial, filtered: state.initial.filter((player) => 
         player.name.toLowerCase().includes(action.payload.inputFilter.name.toLowerCase()) && 
         player.ca <= (action.payload.inputFilter.ca.atmost || 200) && 
         player.ca >= action.payload.inputFilter.ca.atleast && 
         player.pa <= (action.payload.inputFilter.pa.atmost || 200) && 
         player.pa >= action.payload.inputFilter.pa.atleast &&
         player.age <= (action.payload.inputFilter.age.atmost || 50) && 
         player.age >= action.payload.inputFilter.age.atleast && 
         player.price <= (action.payload.inputFilter.price.atmost || 2000) && 
         player.price >= action.payload.inputFilter.price.atleast &&
         player.position.toLowerCase().includes(action.payload.inputFilter.position.toLowerCase())
    )}

    case 'SORT_SQUAD':
    	if (action.payload.orderby === 'asc')
    		return {...state, filtered: state.filtered.sort((a,b) => a[action.payload.key] - b[action.payload.key])}
    	else
    		return {...state, filtered: state.filtered.sort((a,b) => b[action.payload.key] - a[action.payload.key])}

    case 'SELL_SQUAD_PLAYER':
      return {initial: action.payload, filtered: action.payload}

    default:
      return state
	}
}

export default squadListReducer
