import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Loader } from './Loader/Loader.js';
const { loadBids } = require('../store/actions/bidActions')

const PlayersList = (props) => {

  const {loadBids, bidState, idPlayer, setIdPlayer, auth} = props

  /* Определение состояния загрузки данных из БД. */
  /* Ждем пока произойдет загрузка, меняем isLoading на false и рендерим контент */
  const [isLoading, setLoading] = useState(true)
 
  /* При рендере загружаем список игроков, список бидов и устанавливаем статус загрузки в False */
  useEffect(() => { 
    let mounted = true /* Переменная для сброса эффекта */
    loadBids().then(() => { if (mounted) setLoading(false) })

/* Сбрасываем эффект только после того, как асинхронный loadBids будет выполнен*/
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

/* Функция вывода списка игроков, по которым авторизованный пользователь сделал бид  */
  const displayBidList = (bidList) => {
    if (!bidList.length || !auth.isAuthenticated) return null

    const setClass = (playerBidStatus, idPlayer, playerUid) => {
      switch(playerBidStatus) {
        case 'active': 
          return idPlayer === playerUid ? 'bid-active active-player' : 'bid-active'
        case 'finished':
          return idPlayer === playerUid ? 'bid-finished active-player' : 'bid-finished'
        default:
          return idPlayer === playerUid ? 'active-player' : ''
      }
    }

    const userBidList = bidList.filter((bid) => auth.user.userId === bid.userId)

    return userBidList.map((bid, i) => 
      <tr className={setClass(bid.bidStatus, idPlayer, bid.bidId)}
        id={bid.bidId} key={i} 
        onClick={(e)=> setIdPlayer(e.currentTarget.id)}>
        <td>{bid.nation}</td>
        <td>{bid.playerName}</td>
        <td>{bid.position}</td>
        <td>{new Date(bid.date).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}</td>
        <td>{new Date(bid.dateEnd).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}</td>
        <td>{bid.curPrice}</td>
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
                  <th>Nat</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Bid Time</th>
                  <th>Bid End</th>
                  <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {displayBidList(bidState.bidList)}
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
  loadBids: () => dispatch(loadBids())
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList)