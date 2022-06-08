import axios from 'axios'
import {
	SQUAD_PLAYERS_LOADED,
	SQUAD_PLAYERS_ERROR,
	SORT_SQUAD,
	SELL_SQUAD_PLAYER
  } from '../actions/types'

export const loadSquad = (userTeam) => async (dispatch) => {

	try {
		const response = await axios.get('/api/loadsquad', {
			params: { club: userTeam },
			headers: { 'Content-Type': 'application/json; charset=utf-8' } 
		})
		dispatch({type: SQUAD_PLAYERS_LOADED,	payload: response.data})
		
	} catch (err) {
		dispatch({type: SQUAD_PLAYERS_ERROR, payload: 'Ошибка получения списка игроков'})
	}

	// axios({
	// 	method: 'get',
	// 	url: '/api/loadsquad',
	// 	params: { club: userTeam },
	// 	headers: { 'Content-Type': 'application/json; charset=utf-8' } 
	// })
	// .then(res => {
	// 	dispatch({
	// 		type: SQUAD_PLAYERS_LOADED,
	// 		payload: res.data
	// 	})
	// })
	// .catch((err) => {
	// 	dispatch({
	// 		type: 'AUTH_ERROR'
	// 	})
	// })
}

/*---------------------*/
/* Сортировка игроков */
/*-------------------*/
export const sortSquadPlayers = (sortKey) => {
	return {
		type: SORT_SQUAD,
		payload: { key: sortKey }
	}
}

/*----------------------------*/
/* Отчисление игрока состава */
/*--------------------------*/
export const sellSquadPlayer = (playerId, club) => dispatch => {
	axios({
		method: 'get',
		url: '/api/sellsquadplayer',
		params: { uid: playerId , club: club}
	})
	.then(res => {
		dispatch({
			type: SELL_SQUAD_PLAYER,
			payload: res.data
		})
	})
	.catch((err) => {
		dispatch({
			type: 'AUTH_ERROR'
		})
	})
}