import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import PlayerProfile from './components/PlayerProfile/PlayerProfile.js'
import SearchForm from './components/SearchForm/SearchForm.js'
import Auth from './components/Auth/Auth.js'
import Lists from './components/Lists/Lists.js'
//import "@fontsource/exo-2"

function App() {

  return (
	<Router history={Router.browserHistory} basename="/">
		<div className="App">
			<div className="container">
				<div className="row">
					<div className="col l3 m12 s12">
						<Auth/> 
						<SearchForm />
					</div>
					<div className="col l9 m12 s12">
						<Lists />
					</div>
				</div>
				<div className="row">
				<PlayerProfile/>   
				</div>
			</div>
		</div>		
	</Router>
)}

export default App
