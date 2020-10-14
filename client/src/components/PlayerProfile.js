import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import { useLocation } from "react-router-dom"
import BidForm from './BidForm/BidForm.js'
import SellForm from './SellForm.js'
import styles from '../assets/styles/styles.module.css'
import playerImg from '../assets/img/player.png'
import { RadarAnalyzer } from './RadarAnalyzer.js';
import { PlayerSkills} from './SkillsTable/PlayerSkills.js';
import { GkSkills} from './SkillsTable/GkSkills.js';

const PlayerProfile = (props) => {

  const {playersList, squadList, idPlayer} = props

  const [playerInfo, setPlayerInfo] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect (() => {

    if (idPlayer) {
      location.pathname === '/transfers' || location.pathname === '/bids' ?
        setPlayerInfo(playersList.initial.filter((player) => player.uid === idPlayer))
      :
        setPlayerInfo(squadList.initial.filter((player) => player.uid === idPlayer))

        setIsLoading(isLoading => false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[idPlayer])

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
        {playerInfo[0].position === 'GK' ?
          <GkSkills playerInfo={playerInfo[0]}/>
        :
          <PlayerSkills playerInfo={playerInfo[0]}/>
        }
      </div>
    </div>
        <div className="col l2 m4 s6">
            <RadarAnalyzer pi={playerInfo[0]}/>
        </div>
        <div className="col l2 m8 s6">
          {/*console.log(playerInfo) //MANY RE-RENDERS */}
          {!playerInfo[0].club ?
            <BidForm startPrice={playerInfo[0].price} playerId={idPlayer} playerName={playerInfo[0].name}/>
          :
            <SellForm price={playerInfo[0].price} playerId={idPlayer} playerName={playerInfo[0].name}/>
          }
          
        </div>
</>
      ) : <div className='help-msg'>Выберите игрока</div>} 
</>
  );
}

const mapStateToProps = state => ({
  playersList: state.playersList,
  squadList: state.squadList
})

export default connect(mapStateToProps)(PlayerProfile)
