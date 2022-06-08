import React from 'react'
import {gk, technique, mental, physics, hidden} from '../../assets/data/skills'
import PlayerSkillRow from './PlayerSkillRow'

const PlayerSkillsTable = ({playerInfo}) => {

	return (
		<table className="skills-table">
			<tbody>
				<tr>
					<td className="col s6 m4">
						<table className="striped">
							<thead>
								<tr>
									<th colSpan="2" className="center-align skills-table-title">Технические</th>
								</tr>
							</thead>
							<tbody>
								{playerInfo.position === 'GK' ? 
									gk.map((attr,i) => (
										<PlayerSkillRow key={i} attr={attr} playerInfo={playerInfo}/>
									))
								:
									technique.map((attr,i) => (
										<PlayerSkillRow key={i} attr={attr} playerInfo={playerInfo}/>
									))
								}
							</tbody>
						</table>
					</td>
					<td className="col s6 m4">
						<table className="striped">
							<thead>
								<tr>
									<th colSpan="2" className="center-align skills-table-title">Психологические</th>
								</tr>
							</thead>
							<tbody>
								{mental.map((attr,i) => (
									<PlayerSkillRow key={i} attr={attr} playerInfo={playerInfo}/>
								))}
							</tbody>
						</table>
					</td>
					<td className="col s6 m4">
						<table className="striped">
							<thead>
								<tr>
									<th colSpan="2" className="center-align skills-table-title">Физические</th>
								</tr>
							</thead>
							<tbody>
								{physics.map((attr,i) =>(
									<PlayerSkillRow key={i} attr={attr} playerInfo={playerInfo}/>
								))}
								<tr>
									<td colSpan="2" className="center-align" style={{fontWeight: 'bold'}}>Скрытые</td>
								</tr>
								{hidden.map((attr,i) => (
									<PlayerSkillRow key={i} attr={attr} playerInfo={playerInfo}/>
								))}
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	)
}

export default PlayerSkillsTable
