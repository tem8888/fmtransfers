import React from 'react'
import { connect } from 'react-redux'
import {updatePlayerBidStatus} from '../store/actions/playerListActions.js'
import M from 'materialize-css'
const { shortListUpdate, shortListRemove } = require('../store/actions/bidActions')

const AddToList = (props) => {

    const {playerId, playerInfo, shortListUpdate, shortlistInfo, shortListRemove, club} = props

    const addToListHandler = (e) => {
		e.preventDefault()
        
        shortListUpdate(playerInfo, club) /* Обновляем шорт */
        M.toast({html: 'Игрок добавлен в список', classes: 'my-toast'})
	}

    const removeHandler = (e) => {
		e.preventDefault()

        shortListRemove(playerId, club) /* Обновляем шорт */
        M.toast({html: 'Игрок удален из списка', classes: 'my-toast'})
	}

    return (
        <div style={{textAlign:"center", marginLeft:"-10px",marginTop:"15px"}}>
            
        {/* Если игрок не в шортлисте или если это не игрок состава  */}
        {!shortlistInfo.length && playerInfo.club === undefined ? <a href="/#" className={"btn-floating btn-large waves-effect waves-light teal lighten-2"} onClick={addToListHandler}><i className="material-icons">add</i></a> :
        shortlistInfo.length === 1 ? <a href="/#" className={"btn-floating btn-large waves-effect waves-light red lighten-2"} onClick={removeHandler}><i className="material-icons">remove</i></a> : null}
        
        </div>
    )
}

const mapStateToProps = state => ({
    bidState: state.bidState
  });
  
  const mapDispatchToProps = (dispatch, playerInfo, club, playerId, status) => ({
	shortListUpdate: (playerInfo, club) => dispatch(shortListUpdate(playerInfo, club)),
    shortListRemove: (playerId, club) => dispatch(shortListRemove(playerId, club)),
	updatePlayerBidStatus: (playerId, status) => dispatch(updatePlayerBidStatus(playerId, status))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToList)
