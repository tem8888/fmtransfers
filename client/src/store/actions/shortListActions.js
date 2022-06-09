import axios from 'axios'
import { 
	SHORTLIST_LOADED,
	SHORTLIST_ERROR,
	SHORTLIST_ADD,
	SHORTLIST_REMOVE,
	SORT_SHORTLIST,
	} from '../actions/types'

/* Предварительный запрос на загрузку всех бидов */
export const loadShortList = (userTeam) => async (dispatch) => {

	try {
		const response = await axios.get('/api/loadbid', {
			params: { club: userTeam },
			headers: { 'Content-Type': 'application/json; charset=utf-8' } 
		})
		dispatch({type: SHORTLIST_LOADED,	payload: response.data})
		
	} catch (err) {
		dispatch({type: SHORTLIST_ERROR, payload: 'Ошибка получения списка игроков'})
	}
}

/* Добавление игрока в шортлист */
export const shortListAddPlayer = (playerInfo) => (dispatch, getState) => {

	const club = getState().auth.user.club
	axios({
		url: '/api/shortlistadd',
		method: 'post',
		data: { ...playerInfo, club: club}
	})
	.then(res => {
		dispatch({
			type: SHORTLIST_ADD,
			payload: {playerShortlistData: res.data}
		})
	})
	.catch(() => {
		dispatch({
			type: SHORTLIST_ERROR
		})
	})
}

/* Удаление игрока из шортлиста */
export const shortListRemovePlayer = (playerId) => async (dispatch, getState) => {

	const club = getState().auth.user.club

	try {
		await axios.post('/api/shortlistremove', {params: {uid: playerId, club: club}})

		dispatch({type: SHORTLIST_REMOVE, payload: playerId})
	} catch (err) {
		dispatch({ type: SHORTLIST_ERROR })
	}
}

/*---------------------*/
/* Сортировка игроков */
/*-------------------*/
export const sortShortList = (sortKey) => {

	return {
		type: SORT_SHORTLIST,
		payload: { key: sortKey}
	}
}

/* Обновление данных пользователя в БД после сделанного бида  */
/* Добавить отчисление игрока из состава */
// export const updateUser = (price, userId) => (dispatch) => {

// 	axios({
// 		url: '/api/changeuser',
// 		method: 'post',
// 		params: {userId: userId},
// 		data: {money: price}
// 	})
// 	.then((response) => {
// 		if (response)
// 			dispatch({
// 				type: 'USER_UPDATE',
// 				payload: {money: response.data}
// 			})
// 	})
// 	.catch(() => { console.log("Something wrong.") })	
// }
