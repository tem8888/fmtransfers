import axios from 'axios'

export const loadSquadPlayers = (userTeam) => async (dispatch) => {

	await axios({
		method: 'get',
		url: '/api/loadsquad',
		params: { club: userTeam },
		headers: { 'Content-Type': 'application/json; charset=utf-8' } 
	})
		.then(res => {
			dispatch({
				type: 'SQUAD_PLAYERS_LOADED',
				payload: res.data
			})
		})
		.catch((err) => {
			dispatch({
				type: 'AUTH_ERROR'
			})
		})
}

/*---------------------*/
/* Сортировка игроков */
/*-------------------*/
export const sortSquadPlayers = (sortKey) => dispatch => {
	dispatch({
		type: 'SORT_SQUAD',
		payload: { key: sortKey.key, orderby: sortKey.orderby }
	})
}

/*-----------------*/
/* Фильтр игроков */
/*---------------*/
export const setFilter = (inputFilter) => dispatch => {
	if (inputFilter.name || inputFilter.ca.atleast || inputFilter.ca.atmost || 
			inputFilter.pa.atleast ||	inputFilter.pa.atmost || 
			inputFilter.age.atleast ||	inputFilter.age.atmost || 
			inputFilter.price.atleast ||	inputFilter.price.atmost || 
			inputFilter.position !== '') {
	dispatch({
		type: 'FILTER_SQUAD',
		payload: {inputFilter: inputFilter}
	}) 
}
	else {
		dispatch({ type: 'GET_FULL_SQUAD' })
	}
}

/*----------------------------*/
/* Отчисление игрока состава */
/*--------------------------*/
export const sellSquadPlayer = (playerId, club) => async dispatch => {
	await axios({
		method: 'get',
		url: '/api/sellsquadplayer',
		params: { uid: playerId , club: club}
	})
		.then(res => {
			dispatch({
				type: 'SELL_SQUAD_PLAYER',
				payload: res.data
			})
		})
		.catch((err) => {
			dispatch({
				type: 'AUTH_ERROR'
			})
		})
}