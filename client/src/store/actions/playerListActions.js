import axios from 'axios'

//Check token and load user
export const loadPlayers = () => async (dispatch, getState) => {

	await axios.get('/api/load', getState)
		.then(res => {
			dispatch({
				type: 'PLAYERS_LOADED',
				payload: res.data
			})
		})
		.catch((err) => {
			dispatch({
				type: 'AUTH_ERROR'
			})
		})
}

export const loadSquadPlayers = (userTeam) => async (dispatch, getState) => {

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
export const sortPlayers = (sortKey) => dispatch => {
	dispatch({
		type: 'SORT',
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
			inputFilter.price.atleast ||	inputFilter.price.atmost ||	inputFilter.position !== '') {
	dispatch({
		type: 'FILTER',
		payload: {inputFilter: inputFilter}
	}) 
}
	else {
		dispatch({ type: 'GET_FULL_LIST' })
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

/* Обновления поля ActiveBidStatus в БД */
export const updatePlayerBidStatus = (playerId, status) => async (dispatch) => {

	await axios({
		url: '/api/setbidstatus',
		method: 'post',
		params: {uid: playerId},
		data: {bidStatus: status}
	})
	.then((response) => {

			dispatch({
				type: 'BID_PLAYER_STATUS',
				payload: response.data
			})

		})
	.catch(() => {
			dispatch({
				type: 'BID_ERROR'
			})
	})
}