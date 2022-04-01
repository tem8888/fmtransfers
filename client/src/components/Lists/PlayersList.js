import React, {useMemo} from 'react'
import { connect } from 'react-redux'
import { Loader } from '../Loader/Loader.js'
import Table from './Table.js'


const PlayersList = (props) => {
	const { filterList, isLoading } = props

	const columns = useMemo(
		() => [
		{
			Header: 'UID',
			accessor: 'uid', // accessor is the "key" in the data
			width: 80
		},
		{
			Header: 'Nat',
			accessor: 'nation',
			width: 40
		},
		{
			Header: 'Name',
			accessor: 'name',
			width: 190
		},
		{
			Header: 'Position',
			accessor: 'position',
			width: 160
		},
		{
			Header: 'Age',
			accessor: 'age',
		},
		{
			Header: 'CA',
			accessor: 'ca',
		},
		{
			Header: 'PA',
			accessor: 'pa',
		},
		{
			Header: 'Height',
			accessor: 'height'
		},
		{
			Header: 'Weight',
			accessor: 'weight',
		},
		{
			Header: 'Foot',
			accessor: 'preferredfoot',
			width: 75
		},
		{
			Header: 'WP',
			accessor: 'wpneeded',
		},
		{
			Header: 'Price',
			accessor: 'price',
		},
		{
			Header: 'Status (hidden)',
			accessor: 'status',
			show: false
		},
		],
		[]
	)

	const data = useMemo(() => filterList, [filterList])

/* RETURN RENDER */
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Table columns={columns} data={data}/>
			)}
		</>
	)
}

const mapStateToProps = (state) => ({
	filterList: state.playersList.filtered,
	isLoading: state.playersList.loading,
	idPlayer: state.playersList.activePlayer ? state.playersList.activePlayer.uid : ''
})

export default connect(mapStateToProps)(PlayersList)
