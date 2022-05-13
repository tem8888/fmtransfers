import React from 'react';
import {connect} from 'react-redux'
import styles from './playerprofile.module.css'
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
			<div className="col s6 m4 offset-m2 l2">
				<div className={styles.profile}>
					<img src={playerImg} alt=""/>
					<div className={styles.name}>
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
				</div>
			</div>
			<div className="col s6 m4 l3">
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
			<div className="col s12 m9">
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
