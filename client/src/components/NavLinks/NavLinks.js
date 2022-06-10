import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom"
import './navlinks.css'

const NavLinks = ({auth, playerListLength, shortListLength, squadlistLength}) => {

  return (
    <ul className="tabs tabs-fixed-width">
      <li className="tab">
        <NavLink to='/transfers' activeClassName='active'>
          Трансферный список ({playerListLength})
        </NavLink>
      </li>
      <li className="tab">
        <NavLink to='/shortlist' activeClassName='active'>
          Мой список ({auth.isAuthenticated && shortListLength})
        </NavLink>
      </li>
      <li className="tab">
        <NavLink to='/squad' activeClassName='active'>
          Мой состав ({auth.isAuthenticated && squadlistLength})
        </NavLink>
      </li>
    </ul>
  )
}

const mapStateToProps = state => ({
	auth: state.auth,
  squadlistLength: state.squadList.list.length,
	playerListLength: state.playersList.filtered.length,
	shortListLength: Object.keys(state.shortState.list).length
})


export default connect(mapStateToProps)(NavLinks)