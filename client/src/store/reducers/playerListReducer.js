const initialState = {
	initial: {},
	filtered: {},
	activePlayer: null,
	loading: true,
	sorted: false
}

const convertPositions = (positions) => {
	const arr = positions.replace(/ /g,'').split(',')
  const result = []
  const regexp_pos = /.+?(?=\()|.+/g
  const regexp_sides = /(?<=\().+?(?=\))/g
  
  arr.forEach(pos => {
  	let position = pos.match(regexp_pos)[0]
    
    if (position.indexOf('/') === -1) {
    	let sides = pos.match(regexp_sides)
      if (sides)
        sides[0].split('').forEach(side => {
         	result.push(position + side)
        })
      else
      	result.push(position)
    } else {
    	position.split('/').forEach(tpos => {
      	let sides = pos.match(regexp_sides)
      	if (sides)
       		sides[0].split('').forEach(side => {
          	result.push(tpos+side)
        })
      })
    }
  })
  return result
}

const playerListReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PLAYERS_LOADED':
			return { 
				...state, 
				initial: action.payload.slice(0,150), 
				filtered: action.payload.slice(0,150), 
				loading: false, 
				activePlayer: {} 
			}

		case 'GET_FULL_LIST':
			return { ...state, initial: state.initial, filtered: state.initial }

		case 'FILTER':
			{
				const filters = action.payload.inputFilter
				// Если произошел сброс фильтра и пришел пустой объект, то возвращаем начальный список
				if (Object.keys(filters).length === 0)
					return {
						...state,
						initial: state.initial,
						filtered: state.initial
					}
				const minmaxFields = [
					'ca', 'pa', 'age', 'price',
					'lth', 'lon', 'dri', 'fin', 'hea', 'fre', 'cro', 'mar', 'tck', 'pas', 'pen', 'fir', 'tec', 'cor', 'agg', 'vis', 'pos', 'otb', 'fla', 'ant', 'tea', 'con', 'lead', 'dec', 'wor', 'det', 'cmp', 'bra', 'sta', 'jum', 'bal', 'agi', 'nat', 'str', 'pace', 'acc', 'amb', 'impm', 'prof', 'injpr', 'cons', 'thr', 'com', 'kic', 'cmd', 'tro', 'han', 'ovo', 'pun', 'ref', 'aer', 'ecc'
				]
				const textFields = [
					'name',
					'preferredfoot',
					'wpneeded',
				]
				return {
					...state,
					initial: state.initial,
					filtered: state.filtered.filter(
						(player) => {
							for (let key in filters) {
								if (player[key] === undefined) {
									return false;
								} else
								if (minmaxFields.includes(key)) {
									if (filters[key]['min'] !== null && player[key] < filters[key]['min'])
										return false
									if (filters[key]['max'] !== null && player[key] > filters[key]['max'])
										return false
								} else if (textFields.includes(key)){
									if (!player[key].toLowerCase().includes(filters[key].toLowerCase()))
										return false
								} else if (key === 'position') {
									let newPosition = convertPositions(player.position)
									if (filters[key] !== '' && !newPosition.includes(filters[key].toUpperCase()))
										return false
								} else
								
								if (!filters[key].includes(player[key])) {
									return false;
								}
								
							}
							return true
						}
					)
				}
			}
			
		case 'SORT_PLAYERS':
			{
				console.log(action.payload.key)
			if (state.sorted)
				return {...state, sorted: false, filtered: state.filtered.sort((a,b) => b[action.payload.key] - a[action.payload.key])}
			else
				return {...state, sorted: true, filtered: state.filtered.sort((a,b) => a[action.payload.key] - b[action.payload.key])}
			}

		case 'SHOW_SQUAD_PLAYER':
			return {
				...state, 
				activePlayer: action.payload.playerInfo
			}
		
		case 'SHOW_LIST_PLAYER':
			return {
				...state, 
				activePlayer: state.initial.filter((player) => player.uid === action.payload.playerId)[0]
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
