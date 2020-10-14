import React from 'react'
import { NavLink } from "react-router-dom"
import './navlinks.css'

export const NavLinks = () => {
  return (
    <ul className="tabs tabs-fixed-width">
      <li className="tab">
        <NavLink to='/transfers' activeClassName='active'>
          Трансферный список 
        </NavLink>
      </li>
      <li className="tab">
        <NavLink to='/bids' activeClassName='active'>
          Мои биды 
        </NavLink>
      </li>
      <li className="tab">
        <NavLink to='/squad' activeClassName='active'>
          Мой состав 
        </NavLink>
      </li>
    </ul>
  )
}
