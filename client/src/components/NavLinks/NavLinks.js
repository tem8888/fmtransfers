import React from 'react'
import { NavLink } from "react-router-dom"
import './navlinks.css'

export const NavLinks = ({listLength, shortlistLength, squadlistLength}) => {
  return (
    <ul className="tabs tabs-fixed-width">
      <li className="tab">
        <NavLink to='/transfers' activeClassName='active'>
          Трансферный список ({listLength})
        </NavLink>
      </li>
      <li className="tab">
        <NavLink to='/shortlist' activeClassName='active'>
          Мой список ({shortlistLength})
        </NavLink>
      </li>
      <li className="tab">
        <NavLink to='/squad' activeClassName='active'>
          Мой состав ({squadlistLength})
        </NavLink>
      </li>
    </ul>
  )
}
