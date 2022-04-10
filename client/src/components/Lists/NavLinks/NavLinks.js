import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom"
import './navlinks.css'

const NavLinks = ({auth, playerList, shortList, squadlist}) => {
  return (
    <ul className="tabs tabs-fixed-width">
      <li className="tab">
        <NavLink to='/transfers' activeClassName='active'>
          Трансферный список ({playerList.length})
        </NavLink>
      </li>
      <li className="tab">
        <NavLink to='/shortlist' activeClassName='active'>
          Мой список ({auth.isAuthenticated ? shortList.length : null})
        </NavLink>
      </li>
      <li className="tab">
        <NavLink to='/squad' activeClassName='active'>
          Мой состав ({auth.isAuthenticated ? squadlist.length : null})
        </NavLink>
      </li>
    </ul>
  )
}

const mapStateToProps = state => ({
	auth: state.auth,
  squadlist: state.squadList.filtered,
	playerList: state.playersList.filtered,
	shortList: state.shortState.list
})


export default connect(mapStateToProps)(NavLinks)