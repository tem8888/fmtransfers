import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Timer from './Timer.js'
import { saveBid, loadCurrentBid, updateUser } from '../../store/actions/bidActions'
import {updatePlayerBidStatus} from '../../store/actions/playerListActions.js'
import { discordSendMessage } from '../functions/discordSendMessage'
import { Loader } from '../Loader/Loader.js'
import './bidform.css'
const CF = 1.12
// GLOBAL VAR COEF = 1.12

const BidForm = (props) => {

	const {startPrice, playerId, playerName, auth, user, bidState, saveBid, updateUser, loadCurrentBid, updatePlayerBidStatus} = props
	const [isLoading, setLoading] = useState(true)
	const [bidInfo, setBidInfo] = useState({
			bidId: '',
			userId: '',
			playerName: '',
			curPrice: '', 
			nextPrice: '', 
			club: '', 
			date: '',
			dateEnd: '',
			bidStatus: ''
	})

	//const [bidFinished, setBidFinished] = useState(false)
	const [errMsg, setErrMsg] = useState({
		priceErr: '',
		bidSendErr: ''
	})

	/* ----------------------------------------------------------------------------------------------------- */
	/* Грузим данные о биде с сервера. Ждем пока загрузка закончится, только после этого рендерим компонент */
	/* ----------------------------------------------------------------------------------------------------*/
	useEffect(()=> {
		let mounted = true /* Переменная для сброса эффекта */
		setLoading(true) /* Блокируем компонент, пока ждем ответа сервера */
		loadCurrentBid(playerId).then(() => { if (mounted) setLoading(false)	}) /* Дожидаемся ответа сервева и рендерим компонент */
		setErrMsg({priceErr: '',	bidSendErr: ''}) /* Убираем стили инвалидного инпута */
		setBidInfo({...bidInfo, curPrice: ''}) /* Очищаем инпут от введенного значения */

		return () => { /* Сбрасываем эффект только после того, как асинхронный loadCurrentBid будет выполнен*/
			mounted = false
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[playerId]) /* Запрос делаем при выборе игрока из списка */

	/* ---------------------------------------------------------------------------------------------------------------- */
	/* Обработчик отправки бида. Проверка условий, обновление пользователя, сброс инпута, отправление сообщения в дискорд */
	/* ---------------------------------------------------------------------------------------------------------------*/
	const bidSubmitHandler = (e) => {
		e.preventDefault()

		if (!bidInfo.curPrice)
			return setErrMsg({...errMsg, priceErr: 'Введите сумму бида.'})

		if (isNaN(bidInfo.curPrice) || !Number.isInteger(Number(bidInfo.curPrice)))
			return setErrMsg({...errMsg, priceErr: 'Некорректное значение.'})

		if (bidState.currentBid) {
			if (bidInfo.curPrice < bidState.currentBid.nextPrice || bidInfo.curPrice > Math.round(bidState.currentBid.nextPrice*CF))
				return setErrMsg({...errMsg, priceErr: `Цена вне рамок: ${bidState.currentBid.nextPrice}-${Math.round(bidState.currentBid.nextPrice*CF)}`})}
		else if (bidInfo.curPrice < startPrice || bidInfo.curPrice > Math.round(startPrice*CF))
				return setErrMsg({...errMsg, priceErr: `Цена вне рамок: ${startPrice}-${Math.round(startPrice*CF)}`})

		if (user.money < bidInfo.curPrice)
			return setErrMsg({...errMsg, priceErr: 'Увы, не хватает.'})

		setLoading(true)

		saveBid(bidInfo)
		.then(() => { loadCurrentBid(playerId)
		.then(() => { 
			if (bidState.currentBid.club === user.club)	{ /* Проверка, был ли сохранен отправленный бид */
				const userId = user.userId
				const price = bidInfo.curPrice
				updateUser(-price, userId) /* Обновляем деньги пользователя */

				/* Обновляем статус бида */
				const status = 'active'
				updatePlayerBidStatus(playerId, status) /* ??? */

				/* Отправляем сообщение в дискорд */
				if (bidState.currentBid.curPrice > startPrice*CF)
					discordSendMessage(bidState.currentBid, 'rebid', bidState.currentBid.prevBid)
				else
					discordSendMessage(bidState.currentBid, 'buy')
				setErrMsg({priceErr: '',	bidSendErr: ''})
			} 
			else { setErrMsg({...errMsg, bidSendErr: 'Не успели! Бид сделала другая команда!'}) }
			
			setLoading(false)
		})})
		
		resetBidInput() /* Сбрасываем инпут */
	}

 	const resetBidInput = () => {
		setBidInfo({...bidInfo, curPrice: ''})
	}

	const getTimeAfterXMins = (minutes) => {
		let timeAfter30Mins = new Date();
		return timeAfter30Mins = new Date(timeAfter30Mins.setMinutes(timeAfter30Mins.getMinutes() + minutes));
	}

	return (
	<>
		{(isLoading) ?  /* Ждем загрузку данных с сервера. */
			<Loader />
		: 	/* Выводим информацию о биде */
			<>
				<form className="bid-form" onSubmit={bidSubmitHandler}>
					<button className= {!auth.isAuthenticated ? 
						"waves-effect waves-light btn bid-btn disabled" : !bidState.currentBid ?
						"waves-effect waves-light btn bid-btn" : bidState.currentBid.bidStatus === 'finished' ?
						"waves-effect waves-light btn bid-btn disabled" :
						"waves-effect waves-light btn bid-btn"} type="submit">
						Сделать Бид
					</button>
					{errMsg.bidSendErr ? <div className='error-msg'>{errMsg.bidSendErr}</div> : <></>}
					<input className={!auth.isAuthenticated ? 
						"input-bid hide" : !errMsg.priceErr ? "input-bid" : "input-bid invalid"} type="text"
						placeholder={`minimum ${bidState.currentBid ? bidState.currentBid.nextPrice : startPrice}`}
						value={bidInfo.curPrice} 
						onChange={(e) => {
							setBidInfo({...bidInfo,
								bidId: playerId,
								userId: user.userId,
								playerName: playerName,
								curPrice: e.target.value, 
								nextPrice: Math.round(e.target.value*CF), 
								club: user.club, 
								date: new Date(),
								dateEnd: (!bidState.currentBid ? getTimeAfterXMins(2) : 
									new Date(bidState.currentBid.dateEnd) - new Date() < 60000 ? getTimeAfterXMins(1) : getTimeAfterXMins(2)),
								bidStatus: 'active',
							})
							setErrMsg({...errMsg, priceErr: ''})
					}}/>
					{errMsg.priceErr ? <div className='error-msg'>{errMsg.priceErr}</div> : <></>}
				</form>
				{ bidState.currentBid ?   /* Есть ли у игрока данные о биде? */
					<div className="bid-list">
						Текущий бид <br/>
						<b className="bid-club">{bidState.currentBid.club}: {bidState.currentBid.curPrice}</b>
						<div className="bid-time">
							Время бида <br/>
							{new Date(bidState.currentBid.date).toLocaleTimeString('ru-RU')}<br/><br/>
							
							{bidState.currentBid.bidStatus === 'finished' ?
								<span className='success-transfer'>Трансфер завершен {new Date(bidState.currentBid.dateEnd).toLocaleTimeString('ru-RU')}</span> 
								:
								<>
								Трансфер через<br/>
								<Timer 
									date={bidState.currentBid.date} 
									dateEnd={bidState.currentBid.dateEnd}
								/>
								</>
							}
							{/* { playerBid.bidStatus ? updatePlayerBidStatus(playerId, 'finished') : null } */}
						</div>
					</div>
				: <> </> }
			</>
		}
	</>
	)
}

const mapStateToProps = state => ({
  auth: state.auth,
	user: state.auth.user,
  bidState: state.bidState
});

const mapDispatchtoProps = (dispatch, playerBid, playerId, price, userId, status) => ({
	saveBid: (bidInfo) => dispatch(saveBid(bidInfo)),
	updateUser: (price, userId) => dispatch(updateUser(price, userId)),
	loadCurrentBid: (bidInfo) => dispatch(loadCurrentBid(bidInfo)),
	updatePlayerBidStatus: (playerId, status) => dispatch(updatePlayerBidStatus(playerId, status))
})

export default connect(mapStateToProps, mapDispatchtoProps)(BidForm)