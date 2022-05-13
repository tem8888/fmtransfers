import React from 'react'
import { connect } from 'react-redux'
import M from 'materialize-css'
import { useEffect } from 'react'
const { shortListUpdate, shortListRemove } = require('../../store/actions/shortListActions')

const AddToList = ({
    playerId, 
    playerInfo,
    club,
    auth,

    shortListUpdate, 
    shortListRemove, 
    shortList,
    isLoading
    }) => {

    const addToListHandler = (e) => {
		e.preventDefault()

        if (!e.target.className.includes('disabled')) {
            shortListUpdate(playerInfo, club) /* Обновляем шорт */
            M.toast({html: 'Игрок добавлен в список', classes: 'my-toast'})
        } else {
            M.toast({html: 'Нужна авторизация', classes: 'my-toast'})
        }
        
	}

    const removeHandler = (e) => {
		e.preventDefault()

        shortListRemove(playerId, club) /* Обновляем шорт */
        M.toast({html: 'Игрок удален из списка', classes: 'my-toast'})
	}

    const isInShortlist = (uid) => {
        if (!isLoading)
            return shortList.filter((player) => uid === player.uid).length
        else
            return null
    }

    const tapHandler = (tooltip) => {
        console.log('TAP')
        tooltip.className = 'tooltiptext hide-on-med-and-down'
    }

    useEffect(() => {
        const addbtn = document.getElementById('addtolist')
        const tooltip = document.getElementById('tooltiptext')
        console.log(addbtn)

        addbtn.addEventListener('touchstart', console.log('this is TAP'))
        return () => 
            addbtn.removeEventListener('touchstart', console.log('this is TAP'))
    },[])

    

    return (
        
        <div className="col s6 m6 center-align">

        {/* Содержится ли игрок в шортлисте ? */}
        { isInShortlist(playerInfo.uid) ? 
            <a href="/#" 
                className={"btn waves-effect waves-light red lighten-2"} 
                onClick={removeHandler}>
                Remove from list
            </a> 
        : 
           <div className="tooltip">
             <a href="/#" 
                id="addtolist"
                className={auth.isAuthenticated ? "btn waves-effect waves-light teal lighten-2" : "btn waves-effect waves-light teal lighten-2 disabled"} 
                onClick={addToListHandler}>  
                Add to list
            </a>
            <span id="tooltiptext" className={!auth.isAuthenticated ? "tooltiptext hide-on-med-and-down" : 'hide'}>Только для авторизованных пользователей</span>
            </div>
        }
        </div>
    )
}


const mapStateToProps = state => ({
    shortList: state.shortState.list,
    auth: state.auth,
    club: state.auth?.user?.club,
    playerInfo : state.playersList.activePlayer,
    playerId : state.playersList.activePlayer?.uid,
	isLoading: state.shortState.loading,
  });
  
  const mapDispatchToProps = (dispatch) => ({
	shortListUpdate: (playerInfo, club) => dispatch(shortListUpdate(playerInfo, club)),
    shortListRemove: (playerId, club) => dispatch(shortListRemove(playerId, club))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToList)
