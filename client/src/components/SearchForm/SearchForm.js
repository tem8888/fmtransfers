import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import M from 'materialize-css'
import ModalAttributeSearch from './ModalAttributeSearch.js'
const { setFilter } = require('../../store/actions/playerListActions.js')

const SearchForm = (props) => {
	const { setFilter, isLoading } = props
	const [inputFilter, setInputFilter] = useState({})

	const inputHandler = (e) => {
		const { value, id, name } = e.target
		// Дожидаемся загрузки данных, преждем чем пользоваться формой
		// В зависимости от типа инпута создаем свойство объекта: {prp: {min: 'val', max: 'val'}} или {prp: 'val'}
		if (!isLoading) 
			if (name === 'min' || name === 'max') 
				setInputFilter({ ...inputFilter, [id.slice(0,-2)]: {...inputFilter[id.slice(0,-2)], [name]: value}})
			else
				setInputFilter({ ...inputFilter, [id]: value })
	}

	useEffect(() => {
		setFilter(inputFilter)
	}, [setFilter, inputFilter])


	const clearInputs = (e) => { // Очистка всей формы
		e.preventDefault()
		setInputFilter({})
	}

	document.addEventListener('DOMContentLoaded', function() {
		var elems = document.querySelectorAll('.modal');
		// eslint-disable-next-line
		var instances = M.Modal.init(elems);
	});

	return (
		<div className='row'>
			<form className='col s12'>
				<div className='row input-row'>
					<div className='input-field-name col s4'>Name &nbsp;</div>
					<div className='input-field inline col s8'>
						<input
							placeholder='name'
							name='name'
							id='name'
							type='text'
							className='validate blue-text text-lighten-4'
							value={inputFilter.name || ''}
							onChange={inputHandler}
						/>
					</div>
				</div>
				<div className='row input-row'>
					<div className='col s4'>CA &nbsp;</div>
					<div className='col s4 input-field inline'>
						<input
							placeholder='min'
							id='ca_1'
							name='min'
							type='text'
							className='validate'
							value={inputFilter?.ca?.min || ''}
							onChange={inputHandler}
						/>
					</div>
					<div className='col s4 input-field inline'>
						<input
							placeholder='max'
							id='ca_2'
							type='text'
							name='max'
							className='validate'
							value={inputFilter?.ca?.max || ''}
							onChange={inputHandler}
						/>
					</div>
				</div> 
				<div className='row input-row'>
					<div className='col s4'>PA &nbsp;</div>
					<div className='col s4 input-field inline'>
						<input
							placeholder='min'
							id='pa_1'
							name='min'
							type='text'
							className='validate'
							value={inputFilter?.pa?.min || ''}
							onChange={inputHandler}
						/>
					</div>
					<div className='col s4 input-field inline'>
						<input
							placeholder='max'
							id='pa_2'
							name='max'
							type='text'
							className='validate'
							value={inputFilter?.pa?.max || ''}
							onChange={inputHandler}
						/>
					</div>
				</div>
				<div className='row input-row'>
					<div className='col s4'>Price &nbsp;</div>
					<div className='col s4 input-field inline'>
						<input
							placeholder='min'
							id='price_1'
							type='text'
							name='min'
							className='validate'
							value={inputFilter?.price?.min || ''}
							onChange={inputHandler}
						/>
					</div>
					<div className='col s4 input-field inline'>
						<input
							placeholder='max'
							id='price_2'
							type='text'
							name='max'
							className='validate'
							value={inputFilter?.price?.max || ''}
							onChange={inputHandler}
						/>
					</div>
				</div>

				<div className='row input-row'>
					<div className='col s4'>Age &nbsp;</div>
					<div className='col s4 input-field inline'>
						<input
							placeholder='min'
							id='age_1'
							type='text'
							name='min'
							className='validate'
							value={inputFilter?.age?.min || ''}
							onChange={inputHandler}
						/>
					</div>
					<div className='col s4 input-field inline'>
					<input
						placeholder='max'
						id='age_2'
						type='text'
						name='max'
						className='validate'
						value={inputFilter?.age?.max || ''}
						onChange={inputHandler}
					/>
					</div>
				</div>
				<div className='row input-row'>
					<div className='col s4'>Foot &nbsp;</div>
					<div className='col s8'>
						<select
							className='input-field inline'
							value={inputFilter.preferredfoot || ''}
							onChange={inputHandler}
							id='preferredfoot'
						>
							<option value=''>Any</option>
							<option value='left'>Left</option>
							<option value='right'>Right</option>
							<option value='either'>Either</option>
						</select>
					</div>
				</div>
				<div className='row input-row'>
					<div className='col s4'>Position &nbsp;</div>
					<div className='col s8'>
						<select
							className='input-field inline'
							value={inputFilter.position || ''}
							onChange={inputHandler}
							id='position'
						>
							<option value=''>Any</option>
							<option value='gk'>Goalkeaper</option>
							<option value='dr'>Right Defender</option>
							<option value='dc'>Central Defender</option>
							<option value='dl'>Left Defender</option>
							<option value='wbr'>Right Wing-Back</option>
							<option value='wbl'>Left Wing-Back</option>
							<option value='dm'>Defensive Midfielder</option>
							<option value='mc'>Central Midfield</option>
							<option value='mr'>Right Midfielder</option>
							<option value='ml'>Left Midfielder</option>
							<option value='amc'>Central Attacking Midfielder</option>
							<option value='amr'>Right Attacking Midfielder</option>
							<option value='aml'>Left Attacking Midfielder</option>
							<option value='stc'>Striker</option>
						</select>					
					</div>
				</div>
				<div className='row input-row'>
					<div className='col s4'>WP &nbsp;</div>
					<div className='col s8'>
						<select
							className='input-field inline'
							value={inputFilter.wpneeded || ''}
							onChange={inputHandler}
							id='wpneeded'
						>
							<option value=''>Any</option>
							<option value='yes'>Needed</option>
							<option value='no'>Not needed</option>
						</select>
					</div>
				</div>
				
				<div className='col s12 m12 search-button'>
					<a
						href="/#" 
						className={"btn-small waves-effect waves-light"}
						onClick={clearInputs}
					>
						Clear
					</a>
					<a
						href="/#" 
						data-target="modal1" 
						className='btn-small modal-trigger waves-effect waves-light deep-purple lighten-2'
					>
						Attributes+
					</a>
				</div>

				<ModalAttributeSearch 
					inputFilter={inputFilter} 
					inputHandler={inputHandler} 
					setInputFilter={setInputFilter} 
				/>

			</form>
		</div>
	)
}


const mapStateToProps = (state) => ({
	isLoading: state.playersList.loading,
})

const mapDispatchToProps = (dispatch) => ({
	setFilter: (inputFilter) => dispatch(setFilter(inputFilter)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
