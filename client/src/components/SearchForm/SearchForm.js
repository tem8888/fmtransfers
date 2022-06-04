import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import M from 'materialize-css'
import ModalAttributeSearch from './ModalAttributeSearch.js'
import MinMaxInput from './MinMaxInput'
import DropDown from './DropDown.js'

const { setFilter } = require('../../store/actions/playerListActions.js')

const preferredFootOptions = [
	{label: 'Any', value: ''},
	{label: 'Left', value: 'left'},
	{label: 'Right', value: 'right'},
	{label: 'Either', value: 'either'},
]

const positionOptions = [
	{label: 'Any', value: ''},
	{label: 'Goalkeaper', value: 'gk'},
	{label: 'Right Defender', value: 'dr'},
	{label: 'Central Defender', value: 'dc'},
	{label: 'Left Defender', value: 'dl'},
	{label: 'Right Wing-Back', value: 'wbr'},
	{label: 'Left Wing-Back', value: 'wbl'},
	{label: 'Defensive Midfielder', value: 'dm'},
	{label: 'Central Midfield', value: 'mc'},
	{label: 'Right Midfielder', value: 'mr'},
	{label: 'Left Midfielder', value: 'ml'},
	{label: 'Central Attacking Midfielder', value: 'amc'},
	{label: 'Right Attacking Midfielder', value: 'amr'},
	{label: 'Left Attacking Midfielder', value: 'aml'},
	{label: 'Striker', value: 'stc'},
]
const wpneededOptions = [
	{label: 'Any', value: ''},
	{label: 'Needed', value: 'yes'},
	{label: 'Not Needed', value: 'no'},
]

const SearchForm = (props) => {
	const { setFilter, isLoading } = props
	const [inputFilter, setInputFilter] = useState({})
	let inputRef = useRef([])

	const inputHandler = (e) => {
		const { value, id, name, type } = e.target
		inputRef.current = [type, value]
		// Дожидаемся загрузки данных, преждем чем пользоваться формой
		// В зависимости от типа инпута создаем свойство объекта: {prp: {min: 'val', max: 'val'}} или {prp: 'val'}
		if (!isLoading) 
			if (name === 'min' || name === 'max') 
				setInputFilter({ ...inputFilter, [id.slice(0,-2)]: {...inputFilter[id.slice(0,-2)], [name]: value}})
			else
				setInputFilter({ ...inputFilter, [id]: value })
	}

	useEffect(() => {

		// через useRef и setTimeout оптимизируем работу фильтра
		// для текстовых и числовых полей выставляем задержку, прежде чем менять данные
		// в inputRef храним текущий тип инпута и его значение (когда пользователь очищает инпут, задержка не нужна)

		if ((inputRef.current[0] === 'number' || inputRef.current[0] === 'text') && inputRef.current[1] !== '') {
			let timeoutID = setTimeout(() => setFilter(inputFilter), 600)
			return () => {
				clearTimeout(timeoutID)
			}
		} else {
			setFilter(inputFilter)
		}
	}, [setFilter, inputFilter])


	const clearInputs = (e) => { // Очистка всей формы
		e.preventDefault()
		inputRef.current = [] // При сбросе инпутов очищаем Ref, чтобы фильтр применился без задержки
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
				<div className='row input-row valign-wrapper'>
					<div className='input-field-name col s4'>Name &nbsp;</div>
					<div className='input-field inline col s8'>
						<input
							placeholder='name'
							name='name'
							id='name'
							type='text'
							value={inputFilter.name || ''}
							onChange={inputHandler}
						/>
					</div>
				</div>
				<MinMaxInput 
					label={'CA'}
					id={'ca'}
					min={0}
					max={200}
					step={1}
					inputFilter={inputFilter}
					inputHandler={inputHandler}
				/>
				<MinMaxInput 
					label={'PA'}
					id={'pa'}
					min={0}
					max={200}
					step={1}
					inputFilter={inputFilter}
					inputHandler={inputHandler}
				/>
				<MinMaxInput 
					label={'Price'}
					id={'price'}
					min={0}
					step={0.5}
					inputFilter={inputFilter}
					inputHandler={inputHandler}
				/>
				<MinMaxInput 
					label={'Age'}
					id={'age'}
					min={14}
					max={50}
					step={1}
					inputFilter={inputFilter}
					inputHandler={inputHandler}
				/>
				<DropDown 
					label='Foot'
					id='preferredfoot'
					options={preferredFootOptions} 
					inputFilter={inputFilter} 
					inputHandler={inputHandler}
				/>
				<DropDown 
					label='Position'
					id='position'
					options={positionOptions} 
					inputFilter={inputFilter} 
					inputHandler={inputHandler}
				/>
				<DropDown 
					label='WP'
					id='wpneeded'
					options={wpneededOptions} 
					inputFilter={inputFilter} 
					inputHandler={inputHandler}
				/>
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
