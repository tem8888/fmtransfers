import React from 'react'
import {technical, mental, physical, hidden} from '../../skills.js'

export const PlayerSkillsNew = ({playerInfo}) => {
	return (
		<table className="skills-table">
			<thead>
				<tr>
						<th className="col s3 table-skill-name">Технические</th>
						<th className="col s1 table-skill-value"></th>
						<th className="col s3 table-skill-name">Психологические</th>
						<th className="col s1 table-skill-value"></th>
						<th className="col s3 table-skill-name">Физические|Скрытые</th>
						<th className="col s1 table-skill-value"></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="col s3 table-skill-name">
						<table className="striped">
							<tbody>
								{technical.map((skill, i) => ( 
									<tr key={i}>
										<td>{skill}</td>
									</tr> 
								))}
							</tbody>
						</table>
					</td>
					<td className="col s1 table-skill-value">
						<table className="skills-margin">
							<tbody className="striped">
							 { 
									Object.entries(playerInfo).slice(14,28).map((key, i) => (
										<tr key={i}>
											<td style={{
												color: playerInfo[key[0]] > 15? 'var(--excel)': playerInfo[key[0]] > 10? 'var(--good)':
															 playerInfo[key[0]] > 5? 'var(--badly)': 'var(--bad)'}}>
												{playerInfo[key[0]]}
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
						</td>
						<td className="col s3 table-skill-name">
						<table className="striped">
							<tbody>
								{mental.map((skill, i) => ( <tr key={i}><td>{skill}</td></tr> ))}
							</tbody>
						</table>
					</td>
					<td className="col s1 table-skill-value">
						<table className="skills-margin">
							<tbody className="striped">
							{ 
									Object.entries(playerInfo).slice(28,42).map((key, i) => (
										<tr key={i}>
											 <td style={{
												color: playerInfo[key[0]] > 15? 'var(--excel)': playerInfo[key[0]] > 10? 'var(--good)':
															 playerInfo[key[0]] > 5? 'var(--badly)': 'var(--bad)'}}>
												{playerInfo[key[0]]}
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
						</td>
						<td className="col s3 table-skill-name">
						<table className="striped">
							<tbody>
								{physical.map((skill, i) => ( <tr key={i}><td>{skill}</td></tr> ))}
								<tr><td>&nbsp;</td></tr>
								{hidden.map((skill, i) => ( <tr key={i}><td>{skill}</td></tr> ))}
							</tbody>
						</table>
					</td>
					<td className="col s1 table-skill-value">
						<table className="skills-margin">
							<tbody className="striped">
								{ 
									Object.entries(playerInfo).slice(42,50).map((key, i) => (
										<tr key={i}>
											<td style={{
												color: playerInfo[key[0]] > 15? 'var(--excel)': playerInfo[key[0]] > 10? 'var(--good)':
															 playerInfo[key[0]] > 5? 'var(--badly)': 'var(--bad)'}}>
												{playerInfo[key[0]]}
											</td>
										</tr>
									))
								}
								<tr><td>&nbsp;</td></tr>
								{ 
									Object.entries(playerInfo).slice(50,55).map((key, i) => (
										<tr key={i}>
											 <td style={{
												color: playerInfo[key[0]] > 15? 'var(--excel)': playerInfo[key[0]] > 10? 'var(--good)':
															 playerInfo[key[0]] > 5? 'var(--badly)': 'var(--bad)'}}>
												{playerInfo[key[0]]}
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
						</td>
				</tr>
			</tbody>
		</table>
		)
}
