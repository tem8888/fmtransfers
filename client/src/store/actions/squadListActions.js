import axios from 'axios'

export const loadSquad = (userTeam) => (dispatch) => {
	axios({
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
		payload: { key: sortKey }
	})
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