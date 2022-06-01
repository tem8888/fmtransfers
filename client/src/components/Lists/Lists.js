import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from "react-router-dom"
import PlayersList from './PlayersList.js'
import Shortlist from './Shortlist.js';
import SquadList from './SquadList.js';
const { loadPlayers } = require('../../store/actions/playerListActions.js')
const { loadSquad } = require('../../store/actions/squadListActions.js')
const { loadShortList } = require('../../store/actions/shortListActions')
const { loadUser } = require('../../store/actions/authActions.js')

const Lists = ({
	auth, 
	loadUser,
	loadPlayers,
	loadShortList,
	loadSquad,
	}) => {

	useEffect(() => { loadUser() }, [loadUser]); /* Загрузка данных авторизации пользователя */
	useEffect(() => { loadPlayers() }, [loadPlayers])
	useEffect(() => { 
		if (auth.isAuthenticated) {
			loadSquad(auth.user.club)
			loadShortList(auth.user.club)
		}
			 }, 
	[loadShortList, loadSquad, auth])

  	return (
	<>
	<div className="table-container">
		<Switch>
			<Route exact path='/transfers'>
				<PlayersList />  
			</Route>
			<Route path='/shortlist'>
				<Shortlist /> 
			</Route>
			<Route path='/squad'>
				<SquadList /> 
			</Route>  
			<Redirect to="/transfers" /> {/* Redirects all unknown paths to `/transfers` */}
		</Switch>
	</div>
	</>
	)
}


const mapStateToProps = state => ({
	auth: state.auth,
})

const mapDispatchToProps = (dispatch) => ({
	loadPlayers: () => dispatch(loadPlayers()),
	loadUser: () => dispatch(loadUser()),
	// load: () => {
	// 	dispatch(loadUser())
	// 	dispatch(loadPlayers())
	// },
	loadSquad: (userTeam) => dispatch(loadSquad(userTeam)),
	loadShortList: (userTeam) => dispatch(loadShortList(userTeam))
})

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
