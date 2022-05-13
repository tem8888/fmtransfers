import React from 'react'
import { connect } from 'react-redux'
import { useTable, useBlockLayout, useSortBy } from 'react-table'
import { FixedSizeList } from "react-window"
const { showPlayer} = require('../../store/actions/playerListActions')


const Table = ({ columns, data, idPlayer, showPlayer }) => {

	const defaultColumn = React.useMemo(() => ({ width: 55, }), [])

	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns, 
		data, 
		defaultColumn, 
		initialState: {
		hiddenColumns: [
			'status', 
			window.innerWidth < 660 ? 'nation' : '',
			window.innerWidth < 760 ? 'height' : '', 
			window.innerWidth < 760 ? 'weight' : '', 
			window.innerWidth < 660 ? 'uid' : '',
			window.innerWidth < 660 ? 'preferredfoot' : '']
	},
	}, useSortBy, useBlockLayout)

    
	const setClass = (playerBidStatus, idPlayer, playerUid) => {
		switch (playerBidStatus) {
		case 'done':
			return idPlayer === playerUid
			? 'bid-finished active-player'
			: 'bid-finished'
		default:
			return idPlayer === playerUid ? 'active-player' : ''
		}
	}

	const RenderRow = React.useCallback(
		({ index, style }) => {
		const row = rows[index]
		prepareRow(row)
		
		const backgroundColor = index % 2 === 0 ? 'rgb(65, 67, 72)' : null
		style = {...style, backgroundColor, overflowY:"hidden"}

		return (
			<div
			{...row.getRowProps({
				style,
			})}
			id={row.values.uid}
			className={setClass(row.values.status, idPlayer, row.values.uid)}
			onClick={(e) => showPlayer(e.currentTarget.id)} 
			>
			{row.cells.map(cell => {
				return (
				<div 
					{...cell.getCellProps()} 
					// для Price ставим отдельный стиль
					className={
						cell.column.Header === 'Price' ? 
						"td td-price" : 'td'}
				>
					{cell.render('Cell')}
				</div>
				)
			})}
			</div>
		)
		},
		[prepareRow, rows, showPlayer, idPlayer]
	)

	// Render the UI for your table
	return (
		<div {...getTableProps()} className="table">
			<div>
				{headerGroups.map(headerGroup => (
				<div {...headerGroup.getHeaderGroupProps()} className="tr" style={{display: "flex", padding:'3px 0'}}>
					{headerGroup.headers.map(column => (
					
					<div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
						{column.render('Header')}
					</div>
					))}
				</div>
				))}
			</div>

			<div {...getTableBodyProps()}>
				<FixedSizeList
				height={420}
				itemCount={rows.length}
				itemSize={28}
				className={'scrollbar'}
				width={'100%'}
				>
				    {RenderRow}
				</FixedSizeList>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	idPlayer: state.playersList.activePlayer ? state.playersList.activePlayer.uid : ''
})

const mapDispatchToProps = (dispatch) => ({
	showPlayer: (playerId) => dispatch(showPlayer(playerId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)