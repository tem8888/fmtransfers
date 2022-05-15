import React from 'react';
import {connect} from 'react-redux'
import playerImg from '../../assets/img/player.png'

import { RadarAnalyzer } from './RadarAnalyzer.js'
import { PlayerSkillsNew } from './PlayerSkillsNew.js'
import AddToList from './AddToList.js'
import CopyUID from './CopyUID.js'

const PlayerProfile = ({ 
	playerInfo,
	isLoading
	}) => {

	function isEmptyObject(value) {
		return Object.keys(value).length === 0 && value.constructor === Object;
	}

	return (
		<>
		{isEmptyObject(playerInfo) ? 
		
		<div className='help-msg'>Выберите игрока</div>
			:
		<>
			<div className="col s6 m4 offset-m1 l2">
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
			</div>
			<div className="col s6 m5 offset-m1 l3">
				<RadarAnalyzer pi={playerInfo} /> 
				{
					// Добавлять игроков в список могут только авторизованные пользователи
					(!isLoading ) ? 
						
					// Для игроков своего состава показывать кнопку не нужно, свойство wpneeded у них отсутствует
						playerInfo.wpneeded ? 
							<AddToList /> : null	
						: 
						<div className='center-align'>Добавление в список для авторизованных пользователей</div>
				} 
				{!isLoading ?
					<CopyUID 
						playerId={playerInfo.uid}  
					/>
					: null
				} 
			</div>
			
			<div className="col s12 m12 l7">
				<PlayerSkillsNew playerInfo={playerInfo}/> 
			</div>
		</>
		}
		</>
	);
}


const mapStateToProps = state => ({
	isLoading: state.playersList.loading,
	playerInfo : state.playersList.activePlayer || {},
})

export default connect(mapStateToProps)(PlayerProfile)
