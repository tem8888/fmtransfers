import React from 'react'
import {Radar} from 'react-chartjs-2'

export const RadarAnalyzer = ({pi}) => {
	let data = {}

	if (pi.position === 'GK') {

		const sst = (Number(pi['ref']) + Number(pi['ovo'])) / 2
		const phy = (Number(pi['agi']) + Number(pi['str']) + Number(pi['sta']) + Number(pi['bal'])) / 4
		const spd = (Number(pi['acc']) + Number(pi['pac']) + Number(pi['agi'])) / 3
		const men = (Number(pi['ant']) + Number(pi['bra']) + Number(pi['cnt']) + 
					Number(pi['dec']) + Number(pi['det']) + Number(pi['tea'])) / 6
		const com = (Number(pi['com']) + Number(pi['cmd'])) / 2
		const ecc = Number(pi['ecc'])
		const aer = (Number(pi['aer']) + Number(pi['han'])) / 2
		const dis = (Number(pi['thr']) + Number(pi['kic'])) / 2

		data = {
			labels: ['SST', 'PHY', 'SPD', 'MEN', 'COM', 'ECC', 'AER', 'DIS'],
			datasets: [
				{
					label: '',
					data: [sst, phy, spd, men, com, ecc, aer, dis],
					pointBorderWidth: '2px',
					pointRadius: '2px',
					borderWidth: '5px',
					backgroundColor: 'rgba(244, 255, 129, .1)',
					borderColor: 'rgba(244, 255, 129, .95)'
					//  borderColor: 'rgba(255, 255, 255, .9)'
				},
			]
		}
	} 
	else 
	{
		const def = (Number(pi['pos']) + Number(pi['tck']) + Number(pi['mar'])) / 3
		const phy = (Number(pi['agi']) + Number(pi['str']) + Number(pi['sta']) + Number(pi['bal'])) / 4
		const spd = (Number(pi['acc']) + Number(pi['pac']) + Number(pi['agi'])) / 3
		const vis = (Number(pi['pas']) + Number(pi['vis']) + Number(pi['fla'])) / 3
		const att = (Number(pi['fin']) + Number(pi['cmp']) + Number(pi['otb'])) / 3
		const tec = (Number(pi['dri']) + Number(pi['tec']) + Number(pi['fir'])) / 3
		const aer = (Number(pi['jum']) + Number(pi['hea'])) / 2
		const men = (Number(pi['ant']) + Number(pi['bra']) + Number(pi['cnt']) + 
					Number(pi['dec']) + Number(pi['det']) + Number(pi['tea'])) / 6

		data = {
			labels: ['DEF', 'PHY', 'SPD', 'VIS', 'ATT', 'TEC', 'AER', 'MEN'],
			datasets: [
				{
					label: '',
					data: [def, phy, spd, vis, att, tec, aer, men],
					pointBorderWidth: '2px',
					pointRadius: '2px',
					borderWidth: '5px',
					backgroundColor: 'rgba(244, 255, 129, .1)',
					borderColor: 'rgba(244, 255, 129, .95)'
					//  borderColor: 'rgba(255, 255, 255, .9)'
				},
			]
		}
	}
	
	const options = {
		scale: {
			angleLines: {
				display: false
			},
			ticks: {
				beginAtZero: true,
				suggestedMin: 0,
				stepSize: 4,
				suggestedMax: 20,
				callback: function() {return ""},
				backdropColor: "rgba(0, 0, 0, 0)"
			},
			pointLabels: {
				fontColor: 'rgba(230,230,230,0.8)',
				fontSize: 10
			},
			gridLines: {
				color: ['rgba(114, 137, 217, .05)','rgba(114, 137, 217, .15)','rgba(114, 137, 217, .3)','rgba(114, 137, 217, .45)', 'rgba(114, 137, 217, .7)'],
				lineWidth: 2
			},
		},
		legend: { display: false },
		tooltips: { enabled: false }
	}

	return (

		<div style={{ margin: '20px 0 0 -20px' }}>
			<Radar data={data} options={options} width={200} height={200}/>
			{/* <div>CD % {rating}</div> */}
		</div>
	)
}
