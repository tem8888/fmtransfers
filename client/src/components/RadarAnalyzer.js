import React from 'react'
import {Radar} from 'react-chartjs-2'

export const RadarAnalyzer = ({pi}) => {
	let data = {}

	if (pi.position === 'GK') {

		const sst = (Number(pi.skillsGk['ref']) + Number(pi.skillsGk['ovo'])) / 2
		const phy = (Number(pi.skillsPhy['agi']) + Number(pi.skillsPhy['str']) + Number(pi.skillsPhy['sta']) + Number(pi.skillsPhy['bal'])) / 4
		const spd = (Number(pi.skillsPhy['acc']) + Number(pi.skillsPhy['pac']) + Number(pi.skillsPhy['agi'])) / 3
		const men = (Number(pi.skillsMen['ant']) + Number(pi.skillsMen['bra']) + Number(pi.skillsMen['cnt']) + 
					Number(pi.skillsMen['dec']) + Number(pi.skillsMen['det']) + Number(pi.skillsMen['tea'])) / 6
		const com = (Number(pi.skillsGk['com']) + Number(pi.skillsGk['cmd'])) / 2
		const ecc = Number(pi.skillsGk['ecc'])
		const aer = (Number(pi.skillsGk['aer']) + Number(pi.skillsGk['han'])) / 2
		const dis = (Number(pi.skillsGk['thr']) + Number(pi.skillsGk['kic'])) / 2

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
		const def = (Number(pi.skillsMen['pos']) + Number(pi.skillsTec['tck']) + Number(pi.skillsTec['mar'])) / 3
		const phy = (Number(pi.skillsPhy['agi']) + Number(pi.skillsPhy['str']) + Number(pi.skillsPhy['sta']) + Number(pi.skillsPhy['bal'])) / 4
		const spd = (Number(pi.skillsPhy['acc']) + Number(pi.skillsPhy['pac']) + Number(pi.skillsPhy['agi'])) / 3
		const vis = (Number(pi.skillsTec['pas']) + Number(pi.skillsMen['vis']) + Number(pi.skillsMen['fla'])) / 3
		const att = (Number(pi.skillsTec['fin']) + Number(pi.skillsMen['cmp']) + Number(pi.skillsMen['otb'])) / 3
		const tec = (Number(pi.skillsTec['dri']) + Number(pi.skillsTec['tec']) + Number(pi.skillsTec['fir'])) / 3
		const aer = (Number(pi.skillsPhy['jum']) + Number(pi.skillsTec['hea'])) / 2
		const men = (Number(pi.skillsMen['ant']) + Number(pi.skillsMen['bra']) + Number(pi.skillsMen['cnt']) + 
					Number(pi.skillsMen['dec']) + Number(pi.skillsMen['det']) + Number(pi.skillsMen['tea'])) / 6

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
	

	// const rating = (
	//     Number(pi.skillsTec['fir'])/20*0.15 + Number(pi.skillsTec['hea'])/20*0.85 + Number(pi.skillsTec['lon'])/20*0.05 +
	//     Number(pi.skillsTec['mar'])/20*0.85 + Number(pi.skillsTec['pas'])/20*0.30 + Number(pi.skillsTec['tck'])/20*1 +
	//     Number(pi.skillsTec['tec'])/20*0.15 + Number(pi.skillsMen['agg'])/20*0.50 + Number(pi.skillsMen['ant'])/20*0.60 +
	//     Number(pi.skillsMen['bra'])/20*0.60 + Number(pi.skillsMen['cmp'])/20*0.40 + Number(pi.skillsMen['cnt'])/20*0.60 +
	//     Number(pi.skillsMen['vis'])/20*0.15 + Number(pi.skillsMen['dec'])/20*0.50 + Number(pi.skillsMen['pos'])/20*1 +
	//     Number(pi.skillsPhy['acc'])/20*0.15 + Number(pi.skillsPhy['bal'])/20*0.05 + Number(pi.skillsPhy['jum'])/20*0.85 +
	//     Number(pi.skillsPhy['pac'])/20*0.40 + Number(pi.skillsPhy['str'])/20*0.85) * 1.07*100/20
	// const rating = (
	// 	Number(pi.skillsTec['fir'])/20*0.15*1.07 + Number(pi.skillsTec['hea'])/20*0.85*1.07 +
	// 	Number(pi.skillsTec['mar'])/20*0.85*1.07 + Number(pi.skillsTec['pas'])/20*0.30*1.07 + Number(pi.skillsTec['tck'])/20*1*1.07 +
	// 	Number(pi.skillsTec['tec'])/20*0.15*1.07 + Number(pi.skillsMen['agg'])/20*0.50*1.07 + Number(pi.skillsMen['ant'])/20*0.6*1.07 +
	// 	Number(pi.skillsMen['bra'])/20*0.60*1.07 + Number(pi.skillsMen['cmp'])/20*0.40*1.07 + Number(pi.skillsMen['cnt'])/20*0.6*1.07 +
	// 	Number(pi.skillsMen['vis'])/20*0.15*1.07 + Number(pi.skillsMen['dec'])/20*0.50*1.07 + Number(pi.skillsMen['pos'])/20*1*1.07 +
	// 	Number(pi.skillsPhy['acc'])/20*0.15*1.07 + Number(pi.skillsPhy['jum'])/20*0.85*1.07 +
	// 	Number(pi.skillsPhy['pac'])/20*0.40*1.07 + Number(pi.skillsPhy['str'])/20*0.85*1.07) *10
	
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
