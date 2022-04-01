import React from 'react'

export const PlayerSkillsNew = React.memo(({playerInfo}) => {

	const gk = React.useMemo(() => [
        { name: 'Ввод мяча', id: 'thr' },
		{ name: 'Взаимодействие', id: 'com' },
		{ name: 'Выбивание',  id: 'kic' },
		{ name: 'Игра в штрафной', id: 'cmd' },
		{ name: 'Игра руками',  id: 'tro' },
		{ name: 'Один на один', id: 'han' },
		{ name: 'Частота отбивания',      id: 'ovo' },
		{ name: 'Частота отбивания', id: 'pun' },
		{ name: 'Пас',   id: 'pasgk' },
		{ name: 'Первое касание',      id: 'firgk' },
		{ name: 'Реакция', id: 'ref' },
		{ name: 'Игра в воздухе',   id: 'aer' },
		{ name: 'Эксцентричность',   id: 'ecc' }
    ], [])

	const technique = React.useMemo(() => [
        { name: 'Вброс из-за боковой', id: 'lth' },
		{ name: 'Дальние удары', id: 'lon' },
		{ name: 'Дриблинг',  id: 'dri' },
		{ name: 'Завершение атаки', id: 'fin' },
		{ name: 'Игра головой',  id: 'hea' },
		{ name: 'Штрафные', id: 'fre' },
		{ name: 'Навесы',      id: 'cro' },
		{ name: 'Опека', id: 'mar' },
		{ name: 'Отбор',   id: 'tck' },
		{ name: 'Пас',      id: 'pas' },
		{ name: 'Пенальти', id: 'pen' },
		{ name: 'Первое касание',   id: 'fir' },
		{ name: 'Техника',   id: 'tec' },
		{ name: 'Угловые',   id: 'cor' }
    ], [])

	const mental = React.useMemo(() => [
        { name: 'Агрессивность', id: 'agg' },
		{ name: 'Видение поля', id: 'vis' },
		{ name: 'Выбор позиции',  id: 'pos' },
		{ name: 'Игра без мяча', id: 'otb' },
		{ name: 'Импровизация',  id: 'fla' },
		{ name: 'Интуиция', id: 'ant' },
		{ name: 'Командная игра',      id: 'tea' },
		{ name: 'Концентрация', id: 'cnt' },
		{ name: 'Лидерство',   id: 'ldr' },
		{ name: 'Принятие решений',      id: 'dec' },
		{ name: 'Работоспособность', id: 'wor' },
		{ name: 'Решительность',   id: 'det' },
		{ name: 'Самообладание',   id: 'cmp' },
		{ name: 'Храбрость',   id: 'bra' }
    ], [])

	const physics = React.useMemo(() => [
        { name: 'Выносливость', id: 'sta' },
		{ name: 'Высота прыжка',      id: 'jum' },
		{ name: 'Координация', id: 'bal' },
		{ name: 'Ловкость',   id: 'agi' },
		{ name: 'Природные данные',      id: 'nat' },
		{ name: 'Сила', id: 'str' },
		{ name: 'Скорость',   id: 'pac' },
		{ name: 'Ускорение',   id: 'acc' }
    ], [])

	const hidden = React.useMemo(() => [
        { name: 'Амбиции', id: 'amb' },
		{ name: 'Ключевые матчи',      id: 'impm' },
		{ name: 'Профессионализм', id: 'prof' },
		{ name: 'Травматизм',   id: 'injpr' },
		{ name: 'Стабильность',      id: 'cons' }
    ], [])

	return (
		<table className="skills-table">
			<thead>
				<tr>
					<th className="col s4 center-align">Технические</th>
					<th className="col s4 center-align">Психологические</th>
					<th className="col s4 center-align">Физические</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="col s4">
						<table className="striped">
							<tbody>
								{playerInfo.position === 'GK' ? 
									gk.map((attr,i) =>(
										<tr key={i}>
											<td className="table-skill-name">{attr.name}</td>
											<td 
												className="table-skill-value"
												style={{ color: 
													playerInfo[attr.id] > 15 ? 'var(--excel)' : 
													playerInfo[attr.id] > 10 ? 'var(--good)' :
													playerInfo[attr.id] > 5 ? 'var(--badly)' : 'var(--bad)'
												}}
											>
												{playerInfo[attr.id]}
											</td>
										</tr>
									))
								:
									technique.map((attr,i) =>(
										<tr key={i}>
											<td className="table-skill-name">{attr.name}</td>
											<td 
												className="table-skill-value"
												style={{ color: 
													playerInfo[attr.id] > 15 ? 'var(--excel)' : 
													playerInfo[attr.id] > 10 ? 'var(--good)' :
													playerInfo[attr.id] > 5 ? 'var(--badly)' : 'var(--bad)'
												}}
											>
												{playerInfo[attr.id]}
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</td>
					<td className="col s4">
						<table className="striped">
							<tbody>
								{mental.map((attr,i) =>(
									<tr key={i}>
										<td className="table-skill-name">{attr.name}</td>
										<td 
											className="table-skill-value"
											style={{ color: 
												playerInfo[attr.id] > 15 ? 'var(--excel)' : 
												playerInfo[attr.id] > 10 ? 'var(--good)' :
												playerInfo[attr.id] > 5 ? 'var(--badly)' : 'var(--bad)'
											}}
										>
											{playerInfo[attr.id]}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</td>
					<td className="col s4">
						<table className="striped">
							<tbody>
								{physics.map((attr,i) =>(
									<tr key={i}>
										<td className="table-skill-name ">{attr.name}</td>
										<td 
											className="table-skill-value"
											style={{ color: 
												playerInfo[attr.id] > 15 ? 'var(--excel)' : 
												playerInfo[attr.id] > 10 ? 'var(--good)' :
												playerInfo[attr.id] > 5 ? 'var(--badly)' : 'var(--bad)'
											}}
										>
											{playerInfo[attr.id]}
										</td>
									</tr>
								))}
								<tr>
									<td className="center-align" style={{fontWeight: 'bold'}}>Скрытые</td>
									<td></td>
								</tr>
								{hidden.map((attr,i) =>(
									<tr key={i}>
										<td className="table-skill-name">{attr.name}</td>
										<td 
											className="table-skill-value"
											style={{ color: 
												playerInfo[attr.id] > 15 ? 'var(--excel)' : 
												playerInfo[attr.id] > 10 ? 'var(--good)' :
												playerInfo[attr.id] > 5 ? 'var(--badly)' : 'var(--bad)'
											}}
										>
											{playerInfo[attr.id]}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
		)
})
