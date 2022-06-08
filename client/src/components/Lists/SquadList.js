import React from 'react';
import { connect } from 'react-redux'
import { Loader } from '../Loader/Loader.js';
import { sortSquadPlayers } from '../../store/actions/squadListActions.js'
import { showPlayer } from '../../store/actions/playerListActions'

const SquadList = (props) => {

	const {
		sortSquadPlayers, squadList, idPlayer, auth, isLoading, showPlayer
	} = props

	/*  Устанавливаем ключ и порядок сортировки  */
	const sortHandler = (e) => { // [хендлер сортировки по столбцам]
		e.preventDefault()
		sortSquadPlayers(e.target.id)
	}

/* Функция вывода списка всех отфильтрованных игроков */
	const displaySquadList = squadList => {
	if (!squadList.length) return null

	return squadList.map((player, i) => 
		<tr className={idPlayer === player.uid ? 'active-player' : ''}
			id={player.uid} key={i} 
			onClick={ () => showPlayer(player) }
		>
			<td className={'uid-col'}>{player.uid}</td>
			<td>{player.nation}</td>
			<td>{player.name}</td>
			<td>{player.position}</td>
			<td>{player.age}</td>
			<td>{player.ca}</td>
			<td>{player.pa}</td>
			<td className='hide-on-small-only'>{player.height}</td>
			<td className='hide-on-small-only'>{player.weight}</td>
			<td>{player.preferredfoot}</td>
			<td>{player.mins}</td>
			<td>{player.price}</td>
		</tr>
	)
}

/* RETURN RENDER */
	return (
		<div className="table-wrapper scrollbar">
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
				<th id="mins" className='sort-col' onClick={sortHandler}>Minutes</th>
				<th id="price" className='sort-col' onClick={sortHandler}>Price</th>
			</tr>
			</thead>
			<tbody>
			{displaySquadList(squadList)}
			</tbody>
		</table>
	}
		</div>
	)
}

const mapStateToProps = state => ({
	squadList: state.squadList.list,
	idPlayer: state.playersList.activePlayer ? state.playersList.activePlayer.uid : '',
	auth: state.auth,
	sort: state.squadList.sort
})

export default connect(mapStateToProps, {showPlayer, sortSquadPlayers})(SquadList)