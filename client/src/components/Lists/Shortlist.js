import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Loader } from '../Loader/Loader.js'
const { loadBids } = require('../../store/actions/shortListActions')
const { showPlayer } = require('../../store/actions/playerListActions')
const { sortShortList } = require('../../store/actions/shortListActions.js')

const ShortList = (props) => {

	const {isLoading, sortShortList, shortList, idPlayer, auth, showPlayer} = props
	const [sortKey, setSortKey] = useState({
		// состояние ключа сортировки
		key: '',
		orderby: '',
	})

	/*  Устанавливаем ключ и порядок сортировки  */
	const sortHandler = (e) => { // [хендлер сортировки по столбцам]
		e.preventDefault()
		if (sortKey.orderby !== 'asc')
			setSortKey({key: e.target.id, orderby: 'asc'})
		else
			setSortKey({key: e.target.id, orderby: 'desc'})
	}

	/*  При изменении ключа sortKey выполняем сортировку. Пропускаем первый рендер  */
	useEffect(() => {
		if (sortKey.key) 
			sortShortList(sortKey)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortKey])

	/* Функция вывода списка игроков, по которым авторизованный пользователь сделал бид  */
	const displayShortList = (shortList) => {
		

		if (!shortList.length || !auth.isAuthenticated) return null

		const setClass = (playerBidStatus, idPlayer, playerUid) => {
			switch (playerBidStatus) {
			case 'done':
				return idPlayer === playerUid
				? 'bid-finished active-player'
				: 'bid-finished'
			default:
				return idPlayer === playerUid ? 'active-player' : ''
			}
		}

	return shortList.map((bid, i) =>  
		
		<tr className={setClass(bid.status, idPlayer, bid.uid)} 
			id={bid.uid} key={i} 
			onClick={(e)=> showPlayer(e.currentTarget.id)}>
			<td className={'uid-col'}>{bid.uid}</td>
			<td>{bid.nation}</td>
			<td>{bid.name}</td>
			<td>{bid.position}</td>
			<td>{bid.age}</td>
			<td>{bid.ca}</td>
			<td>{bid.pa}</td>
			<td className='hide-on-small-only'>{bid.height}</td>
			<td className='hide-on-small-only'>{bid.weight}</td>
			<td>{bid.preferredfoot}</td>
			<td>{bid.wpneeded}</td>
			<td style={{fontWeight: "bold"}}>{bid.price}</td>
		</tr>
	) }

/* RETURN RENDER */
	return (
	<>
	{!auth.isAuthenticated ? <div className='help-msg'>Необходима авторизация</div> : 
	isLoading ? 
		<Loader /> :
		<table className="striped players-table">
			<thead>
				<tr>
					<th>UID</th>
					<th>Nat</th>
					<th>Name</th>
					<th>Position</th>
					<th id="age" className='sort-col' onClick={sortHandler}>Age</th>
					<th id="ca" className='sort-col' onClick={sortHandler}>CA</th>
					<th id="pa" className='sort-col' onClick={sortHandler}>PA</th>
					<th className='hide-on-small-only'>Height</th>
					<th className='hide-on-small-only'>Weight</th>
					<th>Foot</th>
					<th>WP</th>
					<th id='price' className='sort-col' onClick={sortHandler}>Price</th>
				</tr>
			</thead>
			<tbody>
				{displayShortList(shortList)}
			</tbody>
		</table>
	}
		</>
	)
}

const mapStateToProps = state => ({
	shortList: state.shortState.list,
	isLoading: state.playersList.loading,
	auth: state.auth,
	idPlayer: state.playersList.activePlayer ? state.playersList.activePlayer.uid : ''
})

const mapDispatchToProps = (dispatch) => ({
	showPlayer: (playerId) => dispatch(showPlayer(playerId)),
	loadBids: (team) => dispatch(loadBids(team)),
	sortShortList: ((sortKey) => dispatch(sortShortList(sortKey)))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShortList)