import React, {useEffect} from 'react'
import { BrowserRouter } from "react-router-dom"
import { connect } from 'react-redux'
import PlayerProfile from './components/PlayerProfile/PlayerProfile.js'
import SearchForm from './components/SearchForm/SearchForm.js'
import Auth from './components/Auth/Auth.js'
import Lists from './components/Lists/Lists.js'
import { initialFetch } from './store/actions'

function App({initialFetch}) {

	useEffect(() => {
		initialFetch()
	},[initialFetch])

  return (
	<div className="App">
		<div className="container">
			<div className="row">
				<div className="col l3 m12 s12">
					<Auth/> 
					<SearchForm />
				</div>
				<div className="col l9 m12 s12">
					<BrowserRouter history={BrowserRouter.browserHistory} basename="/">
						<Lists />
					</BrowserRouter>
				</div>
			</div>
			<div className="row">
			<PlayerProfile/>   
			</div>
		</div>
	</div>		
)}

export default connect(null, { initialFetch })(App)
