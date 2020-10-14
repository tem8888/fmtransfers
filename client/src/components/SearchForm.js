import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setFilter} from '../store/actions/playerListActions.js'
//import M from 'materialize-css'

const SearchForm = (props) => {
  const {setFilter} = props
  
  const [inputFilter, setInputFilter] = useState({
    name: '',
    ca: {atleast: '', atmost: ''},
    pa: {atleast: '', atmost: ''},
    price: {atleast: '', atmost: ''},
    age: {atleast: '', atmost: ''},
    position: ''
  })

  const inputHandler = (e) => {
    const {name, value, id} = e.target

    if (name === 'atmost' || name === 'atleast') {
      setInputFilter({...inputFilter, [id]: {...inputFilter[id], [name]: value}})
    } else 
      setInputFilter({...inputFilter, [name]: value})
  }

  useEffect(() => {
    setFilter(inputFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFilter])

  // const [skillFilter, setSkillFilter] = useState({})
  // const [error, setError] = useState('')

  // const skillFilterHandler = (e) => {
  //   const {name, value, id} = e.target
  //   console.log('NAME ', name)
  //   console.log('value ',value)
  //   if (id === 'skill')
  //     if (name)
  //       setSkillFilter({...skillFilter, [name]: value})
  //     else return
  //   else if(value)
  //     setSkillFilter({...skillFilter, [value]: '' })
    
  // }

  // useEffect(() => {
  //   let selects = document.querySelectorAll('select');
    
  //   M.FormSelect.init(selects, {});

  //   // document.addEventListener('DOMContentLoaded', function() {
  //   //   var elems = document.querySelectorAll('select');
  //   //   var instances = M.FormSelect.init(elems, 'active');
  //   // });
  //   // return () => {
  //   //   document.removeEventListener('DOMContentLoaded',function() {
  //   //     var elems = document.querySelectorAll('select');
  //   //     var instances = M.FormSelect.init(elems, 'active');
  //   //   })
  //   // }
  // }, [])

  const clearInputs = (e) => {
    e.preventDefault()
    setInputFilter({
      name: '',
      ca: {atleast: '', atmost: ''},
      pa: {atleast: '', atmost: ''},
      price: {atleast: '', atmost: ''},
      age: {atleast: '', atmost: ''},
      position: ''
    })
  }
 
  return (
        <div className="row">
          <form className="col s12">
            <div className="row input-row">
              <div className="col s12">
                <div className="col s4">
                  Name &nbsp;
                </div>
                <div className="input-field inline col s8">
                  <input 
                    placeholder="name" id="name" name="name"
                    type="text" className="validate blue-text text-lighten-4" 
                    value={inputFilter.name} onChange={inputHandler}/>
                </div>
              </div>
            </div>
            <div className="row input-row">
              <div className="col s12">
                <div className="col s4">
                  CA &nbsp;
                </div>
                <div className="col s4 input-field inline">
                  <input 
                    placeholder="min" id="ca" name="atleast"
                    type="text" className="validate"
                    value={inputFilter.ca.atleast} onChange={inputHandler}/>
                </div>
                <div className="col s4 input-field inline">
                  <input 
                    placeholder="max" id="ca" name="atmost"
                    type="text" className="validate"
                    value={inputFilter.ca.atmost} onChange={inputHandler}/>
                </div>
              </div>
            </div>
            <div className="row input-row">
              <div className="col s12">
                <div className="col s4">
                  PA &nbsp;
                </div>
                <div className="col s4 input-field inline">
                  <input 
                    placeholder="min" name="atleast" id="pa"
                    type="text" className="validate"
                    value={inputFilter.pa.atleast} onChange={inputHandler}/>
                </div>
                <div className="col s4 input-field inline">
                  <input 
                    placeholder="max" name="atmost" id="pa"
                    type="text" className="validate"
                    value={inputFilter.pa.atmost} onChange={inputHandler}/>
                </div>
              </div>
            </div>
            <div className="row input-row">
              <div className="col s12">
                <div className="col s4">
                  Price &nbsp;
                </div>
                <div className="col s4 input-field inline">
                  <input 
                    placeholder="min" name="atleast" id="price"
                    type="text" className="validate" 
                    value={inputFilter.price.atleast} onChange={inputHandler}/>
                </div>
                <div className="col s4 input-field inline">
                  <input 
                    placeholder="max" name="atmost" id="price"
                    type="text" className="validate" 
                    value={inputFilter.price.atmost} onChange={inputHandler}/>
                </div>
              </div>
            </div>
            
            <div className="row input-row">
              <div className="col s12">
                <div className="col s4">
                  Age &nbsp;
                </div>
                <div className="col s4 input-field inline">
                  <input 
                    placeholder="min" name="atleast" id="age"
                    type="text" className="validate"
                    value={inputFilter.age.atleast} onChange={inputHandler}/>
                </div>
                <div className="col s4 input-field inline">
                  <input 
                    placeholder="max" name="atmost" id="age"
                    type="text" className="validate"
                    value={inputFilter.age.atmost} onChange={inputHandler}/>
                </div>
              </div>
            </div>
            <div className="row input-row">
              <div className="col s12">
                <div className="col s4">
                  Position &nbsp;
                </div>
                <div className="col s8">
                  <select className="input-field inline"
                    value={inputFilter.position} onChange={inputHandler} name="position">
                    <option value="">All</option>
                    <option value="gk">Goalkeaper</option>
                    <option value="d">Defender</option>
                    <option value="m">Midfielder</option>
                    <option value="am">Attacking Midfielder</option>
                    <option value="st">Striker</option>
                  </select>
                </div>
              </div>
            </div>
{/*  
            <div className="row input-row">
              <div className="col s12">
                <div className="input-field inline col s4">
                  <select value={skillFilter.name} name={skillFilter.value} id='skill1' onChange={skillFilterHandler}>
                    <option value="">-</option>
                    <option value="thr">Вброс из-за боковой</option>
                    <option value="lon">Дальние удары</option>
                    <option value="dri" name='dri'>Дриблинг</option>
                    <option value="fin">Завершение атаки</option>
                    <option value="hea">Игра головой</option>
                    <option value="sht">Штрафные</option>
                    <option value="cro">Навесы</option>
                    <option value="tck">Отбор</option>
                    <option value="mar">Опека</option>
                    <option value="3">Штрафные</option>
                    <option value="4">Навесы</option>
                    <option value="5">Отбор</option>
                    <option value="4">Навесы</option>
                    <option value="5">Отбор</option>
                  </select>
              
                </div>
                <div className="col s2 input-field inline">
                  <input 
                    placeholder="min" name={document.getElementById('skill1') ? document.getElementById('skill1').value : ''} id='skill'
                    type="text" className="validate"
                    value={document.getElementById('skill1') ? skillFilter.value : ''} onChange={skillFilterHandler}/>
                </div>
                <div className="input-field inline col s4">
                  <select value={skillFilter.name} name={skillFilter.value} id='skill2' onChange={skillFilterHandler}>
                    <option value="">-</option>
                    <option value="thr">Вброс из-за боковой</option>
                    <option value="lon">Дальние удары</option>
                    <option value="dri">Дриблинг</option>
                    <option value="fin">Завершение атаки</option>
                    <option value="hea">Игра головой</option>
                    <option value="sht">Штрафные</option>
                    <option value="cro">Навесы</option>
                    <option value="tck">Отбор</option>
                    <option value="mar">Опека</option>
                    <option value="3">Штрафные</option>
                    <option value="4">Навесы</option>
                    <option value="5">Отбор</option>
                    <option value="4">Навесы</option>
                    <option value="5">Отбор</option>
                  </select>
              
                </div>
                <div className="col s2 input-field inline">
                  <input 
                    placeholder="min" name={document.getElementById('skill2') ? document.getElementById('skill2').value : ''} id='skill'
                    type="text" className="validate"
                    value={skillFilter.value} onChange={skillFilterHandler}/>
                </div>
                </div>
              </div> */}
            <div className="row center-align">
              <button className="waves-effect waves-light btn-small" onClick={clearInputs} style={{margin: '15px'}}>Clear</button>
            </div>
          </form>
    
   </div>
  );
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch, inputFilter) => ({
  setFilter: (inputFilter) => dispatch(setFilter(inputFilter)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
