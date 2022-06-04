import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from "react-router-dom"
import PlayersList from './PlayersList.js'
import Shortlist from './Shortlist.js';
import SquadList from './SquadList.js';
import { initialFetch } from '../../store/actions'

const Lists = ({ initialFetch }) => {

	useEffect(() => {
		initialFetch()
	},[initialFetch])

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

export default connect(null, { initialFetch })(Lists)
