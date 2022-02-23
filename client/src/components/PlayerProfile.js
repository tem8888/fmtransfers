import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import { useLocation } from "react-router-dom"
import styles from '../assets/styles/styles.module.css'
import playerImg from '../assets/img/player.png'
import { RadarAnalyzer } from './RadarAnalyzer.js';
import { PlayerSkillsNew } from './SkillsTable/PlayerSkillsNew.js';
import { GkSkillsNew} from './SkillsTable/GkSkillsNew.js';
import { PlayerSkillsSquad } from './SkillsTable/PlayerSkillsSquad.js';
import { GkSkillsSquad} from './SkillsTable/GkSkillsSquad.js';
import AddToList from './AddToList.js';

const PlayerProfile = (props) => {

  const {playersList, squadList, idPlayer, auth, bidState} = props
  const [playerInfo, setPlayerInfo] = useState()
  const [shortlistInfo, setShortlistInfo] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()



  useEffect (() => {

    if (idPlayer) {
      if (location.pathname === '/transfers' || location.pathname === '/shortlist')
      {
        setPlayerInfo(playersList.initial.filter((player) => player.uid === idPlayer))
        if (auth.isAuthenticated) setShortlistInfo(bidState.bidList.filter((player) => (player.uid === idPlayer && player.club === auth.user.club)))
      } 
      else {
        setPlayerInfo(squadList.initial.filter((player) => player.uid === idPlayer))
        if (auth.isAuthenticated) setShortlistInfo(bidState.bidList.filter((player) => (player.uid === idPlayer && player.club === auth.user.club)))
      }
        setIsLoading(isLoading => false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[idPlayer, bidState])

  useEffect(()=> {
    //	let mounted = true /* Переменная для сброса эффекта */
    //	setLoading(true) /* Блокируем компонент, пока ждем ответа сервера */
         // setShortInfo({...shortInfo, playerId: playerId})
          console.log('check playerprofile]') 
        //  console.log(shortInfo.playerId)
          
    //	return () => { /* Сбрасываем эффект только после того, как асинхронный loadCurrentBid будет выполнен*/
    //		mounted = false
    //	}
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[bidState]) /* Запрос делаем при выборе игрока из списка */

  return (
 <>
        {!isLoading ? ( 
<>
    <div className="col l8 m12 skills">
      <div className="col s6 offset-s3 m3">
        <div className='center-align'>
            <img src={playerImg} alt=""/>
          <div className={styles.profile__name}>
            {playerInfo[0].name}
          </div>
          <div>
            {playerInfo[0].position}
          </div><hr/>
          <div>
            Age: {playerInfo[0].age}
          </div><hr/>
          <div>
            CA: {playerInfo[0].ca}&nbsp;&nbsp; PA: {playerInfo[0].pa}
          </div><hr/>
          <div>
            Foot: {playerInfo[0].preferredfoot}
          </div>
        </div>
      </div>
      <div className="col s12 m9">
        {location.pathname === '/squad' ?
        
        playerInfo[0].position === 'GK' ?
            <GkSkillsSquad playerInfo={playerInfo[0]}/>
          :
            <PlayerSkillsSquad playerInfo={playerInfo[0]}/>
          :
          playerInfo[0].position === 'GK' ?
          <GkSkillsNew playerInfo={playerInfo[0]}/>
        :
          <PlayerSkillsNew playerInfo={playerInfo[0]}/>
      }
      </div>
    </div>
        <div className="col l2 m5 s7">
            <RadarAnalyzer pi={playerInfo[0]}/>
            {(auth.isAuthenticated) ? <AddToList playerId={idPlayer} shortlistInfo={shortlistInfo} playerInfo={playerInfo[0]} club={auth.user.club}/> : 
            <div style={{textAlign:"center"}}>Нужна авторизация, чтобы добавлять игроков в список.</div>}
            
        </div>
        {/* <div className="col l2 m8 s6">

          
        </div> */}
</>
      ) : <div className='help-msg'>Выберите игрока</div>} 
</>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  playersList: state.playersList,
  squadList: state.squadList,
  bidState: state.bidState
})

export default connect(mapStateToProps)(PlayerProfile)
