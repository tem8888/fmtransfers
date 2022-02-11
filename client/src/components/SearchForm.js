import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../store/actions/playerListActions.js'
import M from 'materialize-css'
import ModalAttributeSearch from './ModalAttributeSearch.js'

const SearchForm = (props) => {
  const { setFilter } = props

  const [inputFilter, setInputFilter] = useState({
    name: '',
    ca: { atleast: '', atmost: '' },
    pa: { atleast: '', atmost: '' },
    price: { atleast: '', atmost: '' },
    age: { atleast: '', atmost: '' },
    preferredFoot: '',
    position: '',
    side: '',
    thr: {atleast: ''},
    lon: {atleast: ''},
    skill: '',
    skillNum: ''
  })

  const inputHandler = (e) => {
    const { name, value, id } = e.target

    if (name === 'atmost' || name === 'atleast') {
      setInputFilter({
        ...inputFilter,
        [id]: { ...inputFilter[id], [name]: value },
      })
    } else setInputFilter({ ...inputFilter, [name]: value })
  }

  useEffect(() => {
    setFilter(inputFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFilter])

  const clearInputs = (e) => {
    e.preventDefault()
    setInputFilter({
      name: '',
      ca: { atleast: '', atmost: '' },
      pa: { atleast: '', atmost: '' },
      price: { atleast: '', atmost: '' },
      age: { atleast: '', atmost: '' },
      preferredFoot: '',
      position: '',
      side: '',
      thr: {atleast: ''},
      lon: {atleast: ''},
      skill: '',
      skillNum: ''
    })
  }

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
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
                id='name'
                name='name'
                type='text'
                className='validate blue-text text-lighten-4'
                value={inputFilter.name}
                onChange={inputHandler}
              />
            </div>
        </div>
        <div className='row input-row'>
            <div className='col s4'>CA &nbsp;</div>
            <div className='col s4 input-field inline'>
              <input
                placeholder='min'
                id='ca'
                name='atleast'
                type='text'
                className='validate'
                value={inputFilter.ca.atleast}
                onChange={inputHandler}
              />
            </div>
            <div className='col s4 input-field inline'>
              <input
                placeholder='max'
                id='ca'
                name='atmost'
                type='text'
                className='validate'
                value={inputFilter.ca.atmost}
                onChange={inputHandler}
              />
            </div>
        </div>
        <div className='row input-row'>
            <div className='col s4'>PA &nbsp;</div>
            <div className='col s4 input-field inline'>
              <input
                placeholder='min'
                name='atleast'
                id='pa'
                type='text'
                className='validate'
                value={inputFilter.pa.atleast}
                onChange={inputHandler}
              />
            </div>
            
            <div className='col s4 input-field inline'>
              <input
                placeholder='max'
                name='atmost'
                id='pa'
                type='text'
                className='validate'
                value={inputFilter.pa.atmost}
                onChange={inputHandler}
              />
            </div>
        </div>
        <div className='row input-row'>
            <div className='col s4'>Price &nbsp;</div>
            <div className='col s4 input-field inline'>
              <input
                placeholder='min'
                name='atleast'
                id='price'
                type='text'
                className='validate'
                value={inputFilter.price.atleast}
                onChange={inputHandler}
              />
            </div>
            <div className='col s4 input-field inline'>
              <input
                placeholder='max'
                name='atmost'
                id='price'
                type='text'
                className='validate'
                value={inputFilter.price.atmost}
                onChange={inputHandler}
              />
            </div>
        </div>

        <div className='row input-row'>
            <div className='col s4'>Age &nbsp;</div>
            <div className='col s4 input-field inline'>
              <input
                placeholder='min'
                name='atleast'
                id='age'
                type='text'
                className='validate'
                value={inputFilter.age.atleast}
                onChange={inputHandler}
              />
            </div>
            <div className='col s4 input-field inline'>
              <input
                placeholder='max'
                name='atmost'
                id='age'
                type='text'
                className='validate'
                value={inputFilter.age.atmost}
                onChange={inputHandler}
              />
            </div>
        </div>
        <div className='row input-row'>
            <div className='col s4'>Foot &nbsp;</div>
            <div className='col s8'>
              <select
                className='input-field inline'
                value={inputFilter.preferredFoot}
                onChange={inputHandler}
                name='preferredFoot'
              >
                <option value=''>All</option>
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
                value={inputFilter.position}
                onChange={inputHandler}
                name='position'
              >
                <option value=''>All</option>
                <option value='gk'>Goalkeaper</option>
                <option value='d'>Defender</option>
                <option value='wb'>Wing-Back</option>
                <option value='dm'>Defensive Midfielder</option>
                <option value='m'>Midfielder</option>
                <option value='am'>Attacking Midfielder</option>
                <option value='st'>Striker</option>
              </select>
            </div>
        </div>
        <div className='row input-row'>
            <div className='col s4'>Side &nbsp;</div>
            <div className='col s8'>
              <select
                className='input-field inline'
                value={inputFilter.side}
                onChange={inputHandler}
                name='side'
              >
                <option value=''>All</option>
                <option value='l'>Left</option>
                <option value='c'>Center</option>
                <option value='r'>Right</option>
              </select>
            </div>
        </div>
         
        <div className='row center-align'>
          <button
            className='waves-effect waves-light btn-small'
            onClick={clearInputs}
            style={{ margin: '15px' }}
          >
            Clear
          </button>
          <button
            data-target="modal1" 
            className='btn modal-trigger waves-effect waves-light btn-small deep-purple lighten-2'
            onClick={console.log('object')}
            style={{ margin: '15px' }}
          >
            +Attributes
          </button>
        </div>

        <ModalAttributeSearch inputFilter={inputFilter} inputHandler={inputHandler}/>

      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch, inputFilter) => ({
  setFilter: (inputFilter) => dispatch(setFilter(inputFilter)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
