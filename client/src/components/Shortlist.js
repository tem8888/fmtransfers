import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Loader } from './Loader/Loader.js';
const { loadUser } = require('../store/actions/authActions.js')
const { loadBids } = require('../store/actions/bidActions')
const { sortShortList } = require('../store/actions/bidActions.js')

const PlayersList = (props) => {

  const {isLoading, bidState, idPlayer, setIdPlayer, auth} = props
  const [sortKey, setSortKey] = useState({
    // состояние ключа сортировки
    key: '',
    orderby: '',
  })
 
  /*  При изменении ключа sortKey выполняем сортировку. Пропускаем первый рендер  */
  useEffect(() => {
    if (sortKey.key) 
      sortShortList(sortKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortKey])

  // useEffect(() => {
  //   console.log("LOADBIDS!")
  //   loadBids()
  // }, [bidState])

  /*  Устанавливаем ключ и порядок сортировки  */
  const sortHandler = (e) => { // [хендлер сортировки по столбцам]
    e.preventDefault()
    if (sortKey.orderby !== 'asc')
      setSortKey({key: e.target.id, orderby: 'asc'})
    else
      setSortKey({key: e.target.id, orderby: 'desc'})
  }

/* Функция вывода списка игроков, по которым авторизованный пользователь сделал бид  */
  const displayShortList = (bidList) => {
    

    if (!bidList.length || !auth.isAuthenticated) return null

    // const setClass = (playerBidStatus, idPlayer, playerUid) => {
    //   switch(playerBidStatus) {
    //     case 'active': 
    //       return idPlayer === playerUid ? 'bid-active active-player' : 'bid-active'
    //     case 'finished':
    //       return idPlayer === playerUid ? 'bid-finished active-player' : 'bid-finished'
    //     default:
    //       return idPlayer === playerUid ? 'active-player' : ''
    //   }
    // }

    const userBidList = bidList.filter((bid) => auth.user.club === bid.club)
    return userBidList.map((bid, i) => 
      <tr className={idPlayer === bid.uid ? 'active-player' : ''} 
        id={bid.uid} key={i} 
        onClick={(e)=> setIdPlayer(e.currentTarget.id)}>
          <td className={'uid-col'}>{bid.uid}</td>
        <td>{bid.nation}</td>
        <td>{bid.name}</td>
        <td>{bid.position}</td>
        <td>{bid.age}</td>
        <td>{bid.ca}</td>
        <td>{bid.pa}</td>
        <td>{bid.height}</td>
        <td>{bid.weight}</td>
        <td>{bid.preferredfoot}</td>
        <td>{bid.wpneeded}</td>
        <td style={{fontWeight: "bold"}}>{bid.price}</td>
      </tr>
   ) }

/* RETURN RENDER */
	return (
    <>
    {!auth.isAuthenticated ? <div className='help-msg'>Необходима авторизация</div> : 
      isLoading ? 
        <Loader /> :
          <table className="striped players-table">
            <thead>
              <tr>
                  <th>ID</th>
                  <th>Nat</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th id="age" className='sort-col' onClick={sortHandler}>Age</th>
                  <th id="ca" className='sort-col' onClick={sortHandler}>CA</th>
                  <th id="pa" className='sort-col' onClick={sortHandler}>PA</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Foot</th>
                  <th>WP</th>
                  <th id='price' className='sort-col' onClick={sortHandler}>Price</th>
              </tr>
            </thead>
            <tbody>
              {displayShortList(bidState.bidList)}
            </tbody>
          </table>
      }
		</>
	)
}

const mapStateToProps = state => ({
  bidState: state.bidState,
  auth: state.auth
})

const mapDispatchToProps = (dispatch, sortKey) => ({
  loadUser: () => dispatch(loadUser()),
  loadBids: () => dispatch(loadBids())
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList)