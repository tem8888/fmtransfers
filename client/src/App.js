import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PlayersList from './components/PlayersList.js'
import Shortlist from './components/Shortlist.js';
import SquadList from './components/SquadList.js';
import PlayerProfile from './components/PlayerProfile.js'
import SearchForm from './components/SearchForm.js'
import Auth from './components/Auth/Auth.js'
import { BrowserRouter as Router,
				 Switch,	Route, Redirect } from "react-router-dom"
import { NavLinks } from './components/NavLinks/NavLinks.js'
const { loadPlayers } = require('./store/actions/playerListActions.js')
const { loadSquad } = require('./store/actions/squadListActions.js')
const { loadBids } = require('./store/actions/bidActions')

function App({loadPlayers, loadSquad, loadBids, auth, playersList, bidState, squadList}) {
	
	/* Определение состояния загрузки данных из БД. */
  	/* Ждем пока произойдет загрузка, меняем isLoading на false и рендерим контент */
  	const [isLoading, setLoading] = useState(true)
	const [isLoadingS, setLoadingS] = useState(true)

	const [idPlayer, setIdPlayer] = useState('')

	/* При первом рендере загружаем список игроков, список бидов и устанавливаем статус загрузки в False */
	useEffect(() => {
		if (auth.isAuthenticated) {
			const userTeam = auth.user.club
			loadBids(userTeam).then(() => setLoadingS(false))

		}
	},[auth, loadBids]);

	/* При первом рендере загружаем список игроков, список бидов и устанавливаем статус загрузки в False */
	useEffect(() => { 
		let mounted = true /* Переменная для сброса эффекта */

		loadPlayers()
		.then(() => { if (mounted) setLoading(false) })
		
			return () => { mounted = false }
	}, [loadPlayers]);

	/* При первом рендере загружаем список игроков, список бидов и устанавливаем статус загрузки в False */
	useEffect(() => {
		if (auth.isAuthenticated) {
			const userTeam = auth.user.club
			loadSquad(userTeam).then(() => setLoading(false))

		}
	},[auth, loadSquad]);

  return (
	<Router history={Router.browserHistory}>
		<div className="App">
		
		<div className="container">
			<div className="row">
				<div className="col l3 m12 s12">
					<Auth setIdPlayer={setIdPlayer}/>
					<SearchForm />
				</div>
				<div className="col l9 m12 s12">
					<NavLinks listLength={playersList.filtered.length} shortlistLength={bidState.bidList.length} squadlistLength={squadList.filtered.length}/>
					<div className="table-container">
						<Switch>
						<Route path='/admin'>
			<div>ADMIN</div>
		</Route>
							<Route exact path='/transfers'>
								<PlayersList idPlayer={idPlayer} setIdPlayer={setIdPlayer} isLoading={isLoading}/>
							</Route>
							<Route path='/shortlist'>
								<Shortlist idPlayer={idPlayer} setIdPlayer={setIdPlayer} isLoadingS={isLoadingS}/>
							</Route>
							<Route path='/squad'>
								<SquadList idPlayer={idPlayer} setIdPlayer={setIdPlayer} isLoading={isLoading} />
							</Route>
							<Redirect to="/transfers" />
						</Switch>
					</div>
				</div>
			</div>
			<div className="row">
				{idPlayer ? <PlayerProfile idPlayer={idPlayer}/> : null}
			</div>
			</div>
		</div>		
	</Router>
)}
  
const mapStateToProps = state => ({
	auth: state.auth,
	squadList: state.squadList,
	playersList: state.playersList,
	bidState: state.bidState
})

const mapDispatchToProps = (dispatch) => ({
	loadPlayers: () => dispatch(loadPlayers()),
	loadSquad: (userTeam) => dispatch(loadSquad(userTeam)),
	loadBids: (userTeam) => dispatch(loadBids(userTeam))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
