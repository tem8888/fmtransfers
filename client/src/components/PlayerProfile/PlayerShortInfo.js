import React from 'react'
import playerImg from '../../assets/img/player.png'

const PlayerShortInfo = ({playerInfo}) => {
  return (
    <div className="playerprofile">
        <img src={playerImg} alt=""/>
        <div className="playerprofile__name">
            {playerInfo.name}
        </div>
        <div>
            {playerInfo.position}
        </div>
        <hr/>
        <div>
            Age: {playerInfo.age}
        </div>
        <hr/>
        <div>
            CA: {playerInfo.ca}&nbsp;&nbsp; PA: {playerInfo.pa}
        </div>
        <hr/>
    </div>
  )
}

export default PlayerShortInfo