import React from 'react'
import {gk, mental, physical, hidden} from '../../skills.js'

export const GkSkillsSquad = ({playerInfo}) => {
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
								{gk.map((skill, i) => ( 
									<tr key={i}>
										<td>{skill}</td>
									</tr> 
								))}
							</tbody>
						</table>
					</td>
					<td className="col s1 table-skill-value">
						<table>
							<tbody className="striped">
							 { 
							 
									Object.entries(playerInfo).slice(57,70).map((key, i) => (
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
						<table>
							<tbody className="striped">
							{ 
									Object.entries(playerInfo).slice(30,44).map((key, i) => (
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
						<table>
							<tbody className="striped">
								{ 
									Object.entries(playerInfo).slice(44,52).map((key, i) => (
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
									Object.entries(playerInfo).slice(52,57).map((key, i) => (
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
