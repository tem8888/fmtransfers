import React from 'react'

const FilterAttribute = ({ 
    data, 
    inputHandler, 
    inputFilter, 
    setInputFilter 
    }) => {

    const [attr, setAttr] = React.useState([])

    const generateKey = () => { // Генерируем случайный ключ для списка полей
        return `item_${ new Date().getTime() }`;
    }
  
    const addFieldHandler = (e) => { // Событие добавления нового поля инпута
        e.preventDefault()
        setAttr([...attr, {val: '', val1: '', val2: '', key: generateKey()}])
    }

    const changeSelectHandler = (e) => { // Событие редактирования инпута
        e.preventDefault()
        const items = [...attr]
        items[Number(e.target.name)] = {...items[Number(e.target.name)], val: e.target.value, val1: e.target.value+'_1', val2: e.target.value+'_2'}
        setAttr(items)
      }

    return (
        <div id="modal1" className="modal">
            <div className="modal-content deep-purple lighten-1 purple-text text-lighten-5">
                <h5>Attribute Search</h5>

                {/* Кнопка добавления нового инпута */}
                {/* ________________________________*/}
                <a href='#!' className="waves-effect waves-light btn btn-small" onClick={addFieldHandler}>
                    <i className="material-icons right">input</i>
                    ADD FIELD
                </a>
                <div className='row'>
                    {attr.map((inp, index) => {
                        return (
                            <div className='col s12 attribute-input-row' key={inp.key}>
                                <select name={index} value={attr[index].val} onChange={(e) => changeSelectHandler(e)} className='attribute-select scrollbar'>
                                    <option value=''>Choose</option>
                                    {data.map((attribute,i) => {
                                        // Разные цвета для каждой категории атрибутов - технические, ментальные, физические и тд
                                        if (i < 14) 
                                            return(                                            
                                                <option key={attribute.id} value={attribute.id} className='indigo lighten-3'>{attribute.name}</option>
                                            )
                                        else if (i < 28)
                                            return(                                            
                                               <option key={attribute.id} value={attribute.id} className='light-blue lighten-3'>{attribute.name}</option>
                                             )
                                        else if (i < 36)
                                            return(                                            
                                                <option key={attribute.id} value={attribute.id} className='teal lighten-3'>{attribute.name}</option>
                                            )
                                        else if (i < 41)
                                            return(                                            
                                                <option key={attribute.id} value={attribute.id} className='light-green lighten-3'>{attribute.name}</option>
                                            )
                                        else if (i < 51)
                                            return(                                            
                                                <option key={attribute.id} value={attribute.id} className='yellow lighten-3'>{attribute.name}</option>
                                            )
                                        return null
                                    })}
                                </select>
                                
                                {/* Инпуты Min и Max значений для атрибутов */}
                                {/* ________________________________________*/}
                                <input 
                                    disabled={attr[index].val1 === '' ? true : false} // Разрешаем вводить значения только если выбран атрибут
                                    type='number' 
                                    min='0'
							        max='20'
							        step='1'
                                    placeholder='0' 
                                    id={attr[index].val1}
                                    name='min'
                                    value={inputFilter[attr[index].val]?.min || ''} // || Помогает избежать ошибки с неконтролируемым изменением стейта
                                    onChange={inputHandler}
                                    style={{width:'50px', textAlign: 'center'}}
                                />&nbsp;—&nbsp; 
                                <input 
                                    disabled={attr[index].val1 === '' ? true : false}
                                    type='number'
                                    min='0'
							        max='20'
							        step='1' 
                                    placeholder='20' 
                                    id={attr[index].val2}
                                    name='max'
                                    value={inputFilter[attr[index].val]?.max || ''} // || Помогает избежать ошибки с неконтролируемым изменением стейта
                                    onChange={inputHandler}
                                    style={{width:'50px', textAlign: 'center'}}
                                />

                                {/* Кнопка удаления инпута*/}
                                {/* ______________________*/}
                                <a 
                                    href='#!'
                                    className="btn-floating btn-esmall waves-effect waves-light red lighten-2"
                                    onClick={() => {
                                        setAttr(attr.filter((el,i) => i !== index)) // удаляем только нужный инпут
                                        // при удалении инпута сбрасываем стейт
                                        let state = {...inputFilter}
                                        delete state[attr[index].val]
                                        setInputFilter(state)
                                    }}
                                >
                                    <i className="material-icons">remove</i>
                                </a>
                            </div>    
                        )
                    })}

                </div>
                
            </div>
            <div className="modal-footer deep-purple lighten-1">
                <a href="#!" className="col s12 modal-close waves-effect waves-green btn-flat purple-text text-lighten-5">OK</a>
            </div>
           
        </div>
    )
}

const ModalAttributeSearch = (props) => {
    const {inputFilter, inputHandler, setInputFilter} = props
    const data = React.useMemo(() => [
        { name: 'Вброс из аута', id: 'lth' },
        { name: 'Дальние удары', id: 'lon' },
        { name: 'Дриблинг',      id: 'dri' },
        { name: 'Завершение атаки',      id: 'fin' },
        { name: 'Удар головой',      id: 'hea' },
        { name: 'Штрафные',      id: 'fre' },
        { name: 'Навесы',      id: 'cro' },
        { name: 'Опека',      id: 'mar' },
        { name: 'Отбор',      id: 'tck' },
        { name: 'Пас',      id: 'pas' },
        { name: 'Пенальти',      id: 'pen' },
        { name: 'Первое касание',      id: 'fir' },
        { name: 'Техника',      id: 'tec' },
        { name: 'Угловые',      id: 'cor' },
        { name: 'Агрессивность', id: 'agg' },
        { name: 'Видение поля',  id: 'vis' },
        { name: 'Выбор позиции', id: 'pos' },
        { name: 'Игра без мяча',  id: 'otb' },
        { name: 'Импровизация', id: 'fla' },
        { name: 'Интуиция',  id: 'ant' },
        { name: 'Командная игра', id: 'tea' },
        { name: 'Концентрация',      id: 'con' },
        { name: 'Лидерство', id: 'lead' },
        { name: 'Принятие решений',   id: 'dec' },
        { name: 'Работоспособность', id: 'wor' },
        { name: 'Решительность',      id: 'det' },
        { name: 'Самообладание',      id: 'cmp' },
        { name: 'Храбрость',      id: 'bra' },
        { name: 'Выносливость',      id: 'sta' },
        { name: 'Высота прыжка',      id: 'jum' },
        { name: 'Координация',      id: 'bal' },
        { name: 'Ловкость',      id: 'agi' },
        { name: 'Природные данные',      id: 'nat' },
        { name: 'Сила',      id: 'str' },
        { name: 'Скорость',      id: 'pace' },
        { name: 'Ускорение',      id: 'acc' },
        { name: 'Амбиции',      id: 'amb' },
        { name: 'Ключевые матчи',      id: 'impm' },
        { name: 'Профессионализм',      id: 'prof' },
        { name: 'Травматизм',      id: 'injpr' },
        { name: 'Стабильность',      id: 'cons' },
        { name: 'Ввод мяча',      id: 'thr' },
        { name: 'Взаимодействие',      id: 'com' },
        { name: 'Выбивание',      id: 'kic' },
        { name: 'Игра в штрафной',      id: 'cmd' },
        { name: 'Частота выходов',      id: 'tro' },
        { name: 'Игра руками',      id: 'han' },
        { name: 'Один на один',      id: 'ovo' },
        { name: 'Частота отбивания',      id: 'pun' },
        { name: 'Реакция',      id: 'ref' },
        { name: 'Игра в воздухе',      id: 'aer' },
        { name: 'Эксцентричность',      id: 'ecc' }
    ], [])

    return (
        <FilterAttribute 
            data={data} 
            inputFilter={inputFilter} 
            inputHandler={inputHandler} 
            setInputFilter={setInputFilter} 
        />
    )
}

export default ModalAttributeSearch