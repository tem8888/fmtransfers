import axios from 'axios'
import { 
	PLAYERS_LOADED,
	LOAD_PLAYERS_ERROR,
	SQUAD_PLAYERS_LOADED,
	SORT_PLAYERS,
	FILTER,
	SHOW_SQUAD_PLAYER,
	SHOW_LIST_PLAYER,
	} from './types'

//Check token and load players
export const loadPlayers = () => async (dispatch) => {

	try {
		const response = await axios.get('/api/load')

		if (response.data.length > 0)
			dispatch({type: PLAYERS_LOADED,	payload: response.data})
		else
			dispatch({type: LOAD_PLAYERS_ERROR, payload: 'Игроки в базе отсуствуют'})
		
	} catch (err) {
		dispatch({type: LOAD_PLAYERS_ERROR, payload: 'Ошибка получения списка игроков'})
	}
}

export const loadSquadPlayers = (userTeam) => (dispatch) => {

	axios({
		method: 'get',
		url: '/api/loadsquad',
		params: { club: userTeam },
		headers: { 'Content-Type': 'application/json; charset=utf-8' } 
	})
		.then(res => {
			dispatch({
				type: SQUAD_PLAYERS_LOADED,
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
		type: SORT_PLAYERS,
		payload: { key: sortKey }
	})
}

/*-----------------*/
/* Фильтр игроков */
/*---------------*/
export const setFilter = (inputFilter) => dispatch => {
	
	dispatch({
		type: FILTER,
		payload: {inputFilter: inputFilter}
	}) 
}

/*----------------------------*/
/* Отчисление игрока состава */
/*--------------------------*/

export const showPlayer = (player) => async (dispatch) => {

	if (typeof player === 'object')
		await dispatch({
			type: SHOW_SQUAD_PLAYER,
			payload: { playerInfo: player }
		})
	else
		await dispatch({
			type: SHOW_LIST_PLAYER,
			payload: { playerId: player }
		})
	
}


/* Обновления поля ActiveBidStatus в БД */
export const updatePlayerBidStatus = (playerId, status) => (dispatch) => {

	axios({
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