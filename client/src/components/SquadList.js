import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Loader } from './Loader/Loader.js';
const { loadUser } = require('../store/actions/authActions.js')
const { sortSquadPlayers } = require('../store/actions/squadListActions.js')

const SquadList = (props) => {

  const {sortSquadPlayers, squadList, idPlayer, setIdPlayer, auth, isLoading} = props

	const [sortKey, setSortKey] = useState({ // состояние ключа сортировки
		key: '',
		orderby: ''
	})

/*  При изменении ключа sortKey выполняем сортировку. Пропускаем первый рендер  */
  useEffect(() => {
    if (sortKey.key) 
      sortSquadPlayers(sortKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortKey])

/*  Устанавливаем ключ и порядок сортировки  */
  const sortHandler = (e) => { // [хендлер сортировки по столбцам]
    e.preventDefault()
    if (sortKey.orderby !== 'asc')
      setSortKey({key: e.target.id, orderby: 'asc'})
    else
      setSortKey({key: e.target.id, orderby: 'desc'})
  }

/* Функция вывода списка всех отфильтрованных игроков */
	const displaySquadList = squadList => {
    if (!squadList.length) return null

    return squadList.map((player, i) => 
          <tr className={idPlayer === player.uid ? 'active-player' : ''}
            id={player.uid} key={i} 
           onClick={(e)=>setIdPlayer(e.currentTarget.id)}>
            <td className={'uid-col'}>{player.uid}</td>
            <td>{player.nation}</td>
            <td>{player.name}</td>
            <td>{player.position}</td>
            <td>{player.age}</td>
            <td>{player.ca}</td>
            <td>{player.pa}</td>
            <td>{player.height}</td>
            <td>{player.weight}</td>
            <td>{player.preferredfoot}</td>
            <td>{player.mins}</td>
            <td>{player.price}</td>
          </tr>
    )
  }

/* RETURN RENDER */
	return (
		<>
      {!auth.isAuthenticated ? <div className='help-msg'>Необходима авторизация</div> : 
      isLoading ? 
        <Loader /> :
          <table className="striped players-table">
            <thead>
              <tr>
                  <th>Nat</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th id="age" className='sort-col' onClick={sortHandler}>Age</th>
                  <th id="ca" className='sort-col' onClick={sortHandler}>CA</th>
                  <th id="pa" className='sort-col' onClick={sortHandler}>PA</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Foot</th>
                  <th id="mins" className='sort-col' onClick={sortHandler}>Minutes</th>
                  <th id="price" className='sort-col' onClick={sortHandler}>Price</th>
              </tr>
            </thead>
            <tbody>
              {displaySquadList(squadList.filtered)}
            </tbody>
          </table>
      }
		</>
	)
}

const mapStateToProps = state => ({
  squadList: state.squadList,
  auth: state.auth
})

const mapDispatchToProps = (dispatch, sortKey) => ({
  loadUser: () => dispatch(loadUser()),
  sortSquadPlayers: (sortKey) => dispatch(sortSquadPlayers(sortKey))
})

export default connect(mapStateToProps, mapDispatchToProps)(SquadList)