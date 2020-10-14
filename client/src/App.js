import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PlayersList from './components/PlayersList.js'
import BidList from './components/BidList.js';
import SquadList from './components/SquadList.js';
import PlayerProfile from './components/PlayerProfile.js'
import SearchForm from './components/SearchForm.js'
import Auth from './components/Auth/Auth.js'
import { BrowserRouter as Router,
				 Switch,	Route, Redirect } from "react-router-dom"
import { NavLinks } from './components/NavLinks/NavLinks.js'
const { loadPlayers } = require('./store/actions/playerListActions.js')
const { loadSquadPlayers } = require('./store/actions/squadListActions.js')

function App({loadPlayers, loadSquadPlayers, auth}) {

	/* Определение состояния загрузки данных из БД. */
  /* Ждем пока произойдет загрузка, меняем isLoading на false и рендерим контент */
  const [isLoading, setLoading] = useState(true)

	const [idPlayer, setIdPlayer] = useState('')

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
			loadSquadPlayers(userTeam).then(() => setLoading(false))
		}
	},[auth, loadSquadPlayers]);

  return (
	<Router history={Router.browserHistory}>
		<div className="App">
		<div className="container">
			<div className="row">
				<div className="col l4 m12 s12">
					<Auth />
					<SearchForm />
				</div>
				<div className="col l8 m12 s12">
					<NavLinks />
					<div className="table-container">
						<Switch>
							<Route exact path='/transfers'>
								<PlayersList idPlayer={idPlayer} setIdPlayer={setIdPlayer} isLoading={isLoading}/>
							</Route>
							<Route path='/bids'>
								<BidList idPlayer={idPlayer} setIdPlayer={setIdPlayer}/>
							</Route>
							<Route path='/squad'>
								<SquadList idPlayer={idPlayer} setIdPlayer={setIdPlayer} isLoading={isLoading}/>
							</Route>
							<Redirect to="/transfers" />
						</Switch>
					</div>
				</div>
			</div>
			<div className="row">
				<PlayerProfile idPlayer={idPlayer}/>
			</div>
			</div>
		</div>		
	</Router>
)}
  
const mapStateToProps = state => ({
	auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
	loadPlayers: () => dispatch(loadPlayers()),
	loadSquadPlayers: (userTeam) => dispatch(loadSquadPlayers(userTeam)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
