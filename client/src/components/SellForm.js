import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { sellSquadPlayer } from '../store/actions/playerListActions'
import { updateUser } from '../store/actions/bidActions'
import { discordSendMessage } from './functions/discordSendMessage'

const SellForm = (props) => {
	const {auth, club, userId, updateUser, price, playerId, playerName, sellSquadPlayer} = props

	const [isSell, setIsSell] = useState(false)

	const sellHandler = (e) => {
		e.preventDefault()
		const sellInfo = {userId: userId, playerName: playerName, curPrice: price}
		setIsSell(true)
		sellSquadPlayer(playerId, club)
		updateUser(price, userId)
		discordSendMessage(sellInfo, 'sell')
	}

	useEffect(() => {
		setIsSell(false)
	}, [playerId])
	

	return (
		<div className='center-align'>
			<button className={!auth.isAuthenticated || isSell ? 
				"waves-effect waves-light btn red darken-2 bid-btn disabled" :
				"waves-effect waves-light btn red darken-2 bid-btn"} onClick={sellHandler}>
				Отчислить
			</button>
			<div className="sell-price">за <b>{price}</b> монет</div>
			{isSell ? 
				<div className="sell-msg"> Продано! </div>
				:
				<> </>
			}
</div>
	)
}

const mapStateToProps = state => {
	if (state.auth.isAuthenticated)
		return {
			auth: state.auth,
			userId: state.auth.user.userId,
			club: state.auth.user.club
		}
	else
		return {
			auth: state.auth,
		}
}

const mapDispatchToProps = (dispatch, sortKey) => ({
	sellSquadPlayer: (playerId, club) => dispatch(sellSquadPlayer(playerId, club)),
	updateUser: (price, userId) => dispatch(updateUser(price, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellForm)