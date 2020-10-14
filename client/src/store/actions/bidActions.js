import axios from 'axios'

/* Предварительный запрос на загрузку всех бидов */
export const loadBids = () => async (dispatch, getState) => {

	await axios.get('/api/loadbid', getState)
		.then(res => {
			dispatch({
				type: 'BID_LOADED',
				payload: res.data
			})
		})
		.catch((err) => {
			dispatch({
				type: 'AUTH_ERROR'
			})
		})
}

/* Запрашиваем у сервера информацию о наличии бида у выбранного игрока */
export const loadCurrentBid = (playerId) => async (dispatch) => {

	await axios({
		url: '/api/loadcurrentbid',
		method: 'get',
		params: {bidId: playerId}
	})
	.then(res => {
		dispatch({
			type: 'BID_CURRENT_LOADED',
			payload: res.data
		})
	})
	.catch((err) => {
		dispatch({
			type: 'AUTH_ERROR'
		})
	})
}

/* Отправление бида в БД */
export const saveBid = (playerBid) => async (dispatch) => {

	await axios({
		url: '/api/bidsend',
		method: 'post',
		params: {bidId: playerBid.bidId},
		data: playerBid
	})
	.then((response) => {
		if (response.data === 'tooLateError')
			dispatch({
				type: 'BID_LATE_ERROR'
			})
		else
			dispatch({
				type: 'BID_LIST_UPDATE',
				payload: {bidData: response.data.value, isExisting: response.data.lastErrorObject.updatedExisting}
			})
			console.log(response)

		})
	.catch(() => {
			dispatch({
				type: 'BID_ERROR'
			})
	})
}

/* Обновление данных пользователя в БД после сделанного бида  */
export const updateUser = (price, userId) => async (dispatch) => {

	await axios({
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
