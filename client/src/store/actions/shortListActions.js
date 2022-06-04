import axios from 'axios'

/* Предварительный запрос на загрузку всех бидов */
export const loadShortList = (userTeam) => (dispatch) => {

	axios({
		method: 'get',
		url: '/api/loadbid',
		params: { club: userTeam },
		headers: { 'Content-Type': 'application/json; charset=utf-8' } 
	})
	.then(res => {
		dispatch({
			type: 'SHORTLIST_LOADED',
			payload: res.data
		})
	})
	.catch((err) => {
		dispatch({
			type: 'AUTH_ERROR'
		})
	})
}

/* Добавление игрока в шортлист */
export const shortListUpdate = (playerInfo, club) => (dispatch) => {

	const data = {...playerInfo, club: club}

	axios({
		url: '/api/shortlistadd',
		method: 'post',
		data: data
	})
	.then(res => {
		dispatch({
			type: 'SHORTLIST_ADD',
			payload: {playerShortlistData: res.data}
		})
	})
	.catch(() => {
		dispatch({
			type: 'SHORTLIST_ERROR'
		})
	})
}

/* Удаление игрока из шортлиста */
export const shortListRemove = (playerId, club) => (dispatch) => {

	axios({
		url: '/api/shortlistremove',
		method: 'post',
		params: {uid: playerId, club: club},
	})
	.then((res) => {
		dispatch({
			type: 'SHORTLIST_REMOVE',
			payload: {uid: playerId, club: club}
		})
	})
	.catch(() => {
		dispatch({
			type: 'SHORTLIST_ERROR'
		})
	})
}

/* Обновление данных пользователя в БД после сделанного бида  */
export const updateUser = (price, userId) => (dispatch) => {

	axios({
		url: '/api/changeuser',
		method: 'post',
		params: {userId: userId},
		data: {money: price}
	})
	.then((response) => {
		if (response)
			dispatch({
				type: 'USER_UPDATE',
				payload: {money: response.data}
			})
	})
	.catch(() => { console.log("Something wrong.") })	
}

/*---------------------*/
/* Сортировка игроков */
/*-------------------*/
export const sortShortList = (sortKey) => dispatch => {
	dispatch({
		type: 'SORT_SHORTLIST',
		payload: { key: sortKey}
	})
}