import React from 'react'
import { connect } from 'react-redux'
import M from 'materialize-css'
import Button from '../ui/Button'
import { shortListAddPlayer, shortListRemovePlayer } from '../../store/actions/shortListActions'

const AddToList = ({
    playerId, 
    playerInfo,
    isAuthenticated,
    shortListAddPlayer, 
    shortListRemovePlayer, 
    shortList
    }) => {

    const addToListHandler = (e) => {
		e.preventDefault()
        
        shortListAddPlayer(playerInfo) /* Обновляем шорт */
        M.toast({html: 'Игрок добавлен в список', classes: 'my-toast'})
	}

    const removeHandler = (e) => {
		e.preventDefault()

        shortListRemovePlayer(playerId) /* Обновляем шорт */
        M.toast({html: 'Игрок удален из списка', classes: 'my-toast'})
	}

    const renderButton = () => {
        // Если игрок уже находится в шортлисте, то показываем кнопку удаления
       // if (shortList.find((player) => player.uid === playerInfo.uid) && isAuthenticated)
        if (Object.keys(shortList).find((keyID) => keyID === playerInfo.uid) && isAuthenticated)
            return (
                <Button onClick={removeHandler} color={'red lighten-2'}>
                    Remove from list
                </Button>
            )
        // Если игрока нет в шортлисте
        else
            return (
                <div className="tooltip">
                    <Button onClick={addToListHandler} color={'teal lighten-2'} disabled={!isAuthenticated ? 'disabled' : ''}>
                        Add to list
                    </Button>
                    {!isAuthenticated ? 
                        <span className='tooltiptext hide-on-med-and-down'>Только для авторизованных пользователей</span>
                    : null }
                </div>
            )
    }
    
    return (
        <div className="col s12 m6 center-align button-margin">
            {renderButton()}
        </div>
    )
}


const mapStateToProps = state => ({
    shortList: state.shortState.list,
    isAuthenticated: state.auth.isAuthenticated,
    playerInfo : state.playersList.activePlayer,
    playerId : state.playersList.activePlayer?.uid
  });

export default connect(mapStateToProps, {shortListAddPlayer, shortListRemovePlayer})(AddToList)
