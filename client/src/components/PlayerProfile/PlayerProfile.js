import React from 'react';
import {connect} from 'react-redux'

import { RadarAnalyzer } from './RadarAnalyzer.js'
import PlayerSkills from './PlayerSkillsTable.js'
import AddToList from './AddToList.js'
import CopyUID from './CopyUID.js'
import PlayerShortInfo from './PlayerShortInfo';

const PlayerProfile = ({ playerInfo }) => {

	function isEmptyObject(value) {
		return Object.keys(value).length === 0 && value.constructor === Object;
	}

	if (isEmptyObject(playerInfo))
		return <div className='help-msg'>Выберите игрока</div>
	else
		return (
			<>
			<div className="col s6 m4 offset-m1 l2">
				<PlayerShortInfo playerInfo={playerInfo}/>
			</div>
			<div className="col s6 m5 offset-m1 l3">
				<RadarAnalyzer pi={playerInfo} /> 
				{/* Для игроков своего состава показывать кнопку добавления игрока в шортлист не нужно, 
					свойство wpneeded у них отсутствует */}
				{playerInfo.wpneeded ? <AddToList /> : null}
				<CopyUID playerId={playerInfo.uid} />
			</div>
			
			<div className="col s12 m12 l7">
				<PlayerSkills playerInfo={playerInfo}/> 
			</div>
			</>
		)
}


const mapStateToProps = state => ({
	isLoading: state.playersList.loading,
	playerInfo : state.playersList.activePlayer || {},
})

export default connect(mapStateToProps)(PlayerProfile)
