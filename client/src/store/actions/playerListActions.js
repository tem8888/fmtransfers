import axios from 'axios'

//Check token and load user
export const loadPlayers = (userTeam) => async (dispatch, getState) => {

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
		type: 'SORT_PLAYERS',
		payload: { key: sortKey }
	})
}

/*-----------------*/
/* Фильтр игроков */
/*---------------*/
export const setFilter = (inputFilter) => dispatch => {
	
	dispatch({
		type: 'FILTER',
		payload: {inputFilter: inputFilter}
	}) 
}

/*----------------------------*/
/* Отчисление игрока состава */
/*--------------------------*/

export const showPlayer = (player) => async (dispatch) => {

	if (typeof player === 'object')
		await dispatch({
			type: 'SHOW_SQUAD_PLAYER',
			payload: { playerInfo: player }
		})
	else
		await dispatch({
			type: 'SHOW_LIST_PLAYER',
			payload: { playerId: player }
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