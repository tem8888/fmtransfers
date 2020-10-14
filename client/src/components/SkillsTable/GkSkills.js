import React from 'react'
import {gk, mental, physical, hidden} from '../../skills.js'

export const GkSkills = ({playerInfo}) => {
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
									Object.keys(playerInfo.skillsGk).map((key, i) => (
										<tr key={i}>
											<td style={{
												color: playerInfo.skillsGk[key] > 15? 'var(--excel)': playerInfo.skillsGk[key] > 10? 'var(--good)':
															 playerInfo.skillsGk[key] > 5? 'var(--badly)': 'var(--bad)'}}>
												{playerInfo.skillsGk[key]}
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
									Object.keys(playerInfo.skillsMen).map((key, i) => (
										<tr key={i}>
											 <td style={{
												color: playerInfo.skillsMen[key] > 15? 'var(--excel)': playerInfo.skillsMen[key] > 10? 'var(--good)':
															 playerInfo.skillsMen[key] > 5? 'var(--badly)': 'var(--bad)'}}>
												{playerInfo.skillsMen[key]}
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
									Object.keys(playerInfo.skillsPhy).map((key, i) => (
										<tr key={i}>
											<td style={{
												color: playerInfo.skillsPhy[key] > 15? 'var(--excel)': playerInfo.skillsPhy[key] > 10? 'var(--good)':
															 playerInfo.skillsPhy[key] > 5? 'var(--badly)': 'var(--bad)'}}>
												{playerInfo.skillsPhy[key]}
											</td>
										</tr>
									))
								}
								<tr><td>&nbsp;</td></tr>
								{ 
									Object.keys(playerInfo.skillsHid).map((key, i) => (
										<tr key={i}>
											 <td style={{
												color: playerInfo.skillsHid[key] > 15? 'var(--excel)': playerInfo.skillsHid[key] > 10? 'var(--good)':
															 playerInfo.skillsHid[key] > 5? 'var(--badly)': 'var(--bad)'}}>
												{playerInfo.skillsHid[key]}
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
