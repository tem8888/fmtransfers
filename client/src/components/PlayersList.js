import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Loader } from './Loader/Loader.js'
const {
  sortPlayers,
  loadPlayers,
} = require('../store/actions/playerListActions.js')
const { loadBids } = require('../store/actions/bidActions')

const PlayersList = (props) => {
  const {
    sortPlayers,
    playersList,
    idPlayer,
    setIdPlayer,
    isLoading,
  } = props

  const [sortKey, setSortKey] = useState({
    // состояние ключа сортировки
    key: '',
    orderby: '',
  })

  /*  При изменении ключа sortKey выполняем сортировку. Пропускаем первый рендер  */
  useEffect(() => {
    if (!isLoading) sortPlayers(sortKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortKey])

  /*  Устанавливаем ключ и порядок сортировки  */
  const sortHandler = (e) => {
    // [хендлер сортировки по столбцам]
    e.preventDefault()
    if (sortKey.orderby !== 'asc')
      setSortKey({ key: e.target.id, orderby: 'asc' })
    else setSortKey({ key: e.target.id, orderby: 'desc' })
  }

  /* Функция вывода списка всех отфильтрованных игроков */
  const displayPlayersList = (playersList) => {
    if (!playersList.length) return null

    const setClass = (playerBidStatus, idPlayer, playerUid) => {
      switch (playerBidStatus) {
        case 'active':
          return idPlayer === playerUid
            ? 'bid-active active-player'
            : 'bid-active'
        case 'done':
          return idPlayer === playerUid
            ? 'bid-finished active-player'
            : 'bid-finished'
        default:
          return idPlayer === playerUid ? 'active-player' : ''
      }
    }

    return playersList.map((player, i) => (
      <tr
        className={setClass(player.status, idPlayer, player.uid)}
        id={player.uid}
        key={i}
        onClick={(e) => setIdPlayer(e.currentTarget.id)}
      >
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
        <td>{player.wpneeded}</td>
        <td style={{fontWeight: "bold"}}>{player.price}</td>
      </tr>
    ))
  }

  // if (!isLoading) {
  //   var rows = document.getElementById("players-table").children[1].children;
  //   var selectedRow = 0;
  //   document.body.onkeydown = function(e){
  //       //Prevent page scrolling on keypress
  //       e.preventDefault();
  //       //Clear out old row's color
  //       rows[selectedRow].style.backgroundColor = "#FFFFFF";
  //       //Calculate new row
  //       if(e.KeyboardEvent.keyCode == 38){
  //           selectedRow--;
  //       } else if(e.KeyboardEvent.keyCode == 40){
  //           selectedRow++;
  //       }
  //       if(selectedRow >= rows.length){
  //           selectedRow = 0;
  //       } else if(selectedRow < 0){
  //           selectedRow = rows.length-1;
  //       }
  //       //Set new row's color
  //       rows[selectedRow].style.backgroundColor = "#8888FF";
  //   };
  //   //Set the first row to selected color
  //   rows[0].style.backgroundColor = "#8888FF";
  // }
  

  /* RETURN RENDER */
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <table id='players-table' className='striped players-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nat</th>
                <th>Name</th>
                <th>Position</th>
                <th id='age' className='sort-col' onClick={sortHandler}>
                  Age
                </th>
                <th id='ca' className='sort-col' onClick={sortHandler}>
                  CA
                </th>
                <th id='pa' className='sort-col' onClick={sortHandler}>
                  PA
                </th>
                <th>Height</th>
                <th>Weight</th>
                <th>Foot</th>
                <th>WP</th>
                <th id='price' className='sort-col' onClick={sortHandler}>
                  Price
                </th>
              </tr>
            </thead>
            <tbody>{displayPlayersList(playersList.filtered)}</tbody>
          </table>
          {/* <div className='players-count'>
            <i className='tiny material-icons renew' onClick={reloadHandler}>
              autorenew
            </i>
            &nbsp; Игроков найдено: {playersList.filtered.length}
          </div> */}
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  playersList: state.playersList,
  bidState: state.bidState,
  auth: state.auth,
})

const mapDispatchToProps = (dispatch, sortKey) => ({
  loadBids: () => dispatch(loadBids()),
  loadPlayers: () => dispatch(loadPlayers()),
  sortPlayers: (sortKey) => dispatch(sortPlayers(sortKey)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList)
