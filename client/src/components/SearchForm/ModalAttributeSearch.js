import React from 'react'
import { createPortal } from 'react-dom'
import generateKey from '../../helpers/generateKey'
import {
    gk,
    technique,
    mental,
    physics,
    hidden,
} from '../../assets/data/skills'
import Button from '../ui/Button'

const ModalAttributeSearch = (props) => {
    const {
        inputFilter,
        inputHandler,
        setInputFilter,
        closeModal,
        isModalOpen,
    } = props

    const [attr, setAttr] = React.useState([])

    const addFieldHandler = (e) => {
        // Событие добавления нового поля инпута
        e.preventDefault()
        setAttr([...attr, { val: '', val1: '', val2: '', key: generateKey() }])
    }

    const changeSelectHandler = (e) => {
        // Событие редактирования инпута
        e.preventDefault()
        const items = [...attr]
        items[Number(e.target.name)] = {
            ...items[Number(e.target.name)],
            val: e.target.value,
            val1: e.target.value + '_1',
            val2: e.target.value + '_2',
        }
        setAttr(items)
    }

    const RenderOptionSkills = ({ label, skills, color }) => {
        return (
            <optgroup label={label}>
                {skills.map((skill) => {
                    return (
                        <option
                            key={skill.id}
                            value={skill.id}
                            className={color}
                        >
                            {skill.name}
                        </option>
                    )
                })}
            </optgroup>
        )
    }

    return createPortal(
        <div
            className={`modal-wrapper ${isModalOpen ? '' : 'hide-modal'}`}
            onClick={closeModal}
        >
            <div
                className="modal modal-fixed-footer"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content deep-purple lighten-1 purple-text text-lighten-5">
                    <div className="row modal-header">
                        <div className="col s12 m6 l4">
                            <h5 style={{ margin: '5px' }}>Attribute Search</h5>
                        </div>
                        <div className="col s6 m6 l8">
                            <Button onClick={addFieldHandler}>
                                <i className="material-icons right">input</i>
                                ADD FIELD
                            </Button>
                        </div>
                    </div>

                    {attr.map((inp, index) => {
                        return (
                            <div key={inp.key} className="row">
                                <div className="col s5 m5 l3 attribute-input-row">
                                    <select
                                        name={index}
                                        value={attr[index].val}
                                        onChange={(e) => changeSelectHandler(e)}
                                        className="attribute-select scrollbar"
                                    >
                                        <option value="" disabled>
                                            Не выбрано
                                        </option>
                                        <RenderOptionSkills
                                            label={'Технические'}
                                            skills={technique}
                                            color={'indigo lighten-3'}
                                        />
                                        <RenderOptionSkills
                                            label={'Психологические'}
                                            skills={mental}
                                            color={'light-blue lighten-3'}
                                        />
                                        <RenderOptionSkills
                                            label={'Физические'}
                                            skills={physics}
                                            color={'teal lighten-3'}
                                        />
                                        <RenderOptionSkills
                                            label={'Скрытые'}
                                            skills={hidden}
                                            color={'light-green lighten-3'}
                                        />
                                        <RenderOptionSkills
                                            label={'Вратарские'}
                                            skills={gk}
                                            color={'yellow lighten-3'}
                                        />
                                    </select>
                                </div>

                                {/* Инпуты Min и Max значений для атрибутов */}
                                {/* ________________________________________*/}
                                <div className="col s7 m7 l9">
                                    <input
                                        disabled={
                                            attr[index].val === ''
                                                ? true
                                                : false
                                        } // Разрешаем вводить значения только если выбран атрибут
                                        type="number"
                                        min="0"
                                        max={
                                            inputFilter[attr[index].val]?.max ||
                                            '20'
                                        }
                                        step="1"
                                        placeholder="0"
                                        id={attr[index].val1}
                                        name="min"
                                        value={
                                            inputFilter[attr[index].val]?.min ||
                                            ''
                                        }
                                        onChange={inputHandler}
                                        style={{
                                            width: '40px',
                                            textAlign: 'center',
                                            backgroundColor: !attr[index].val
                                                ? '#9f7ca5'
                                                : '',
                                        }}
                                    />
                                    &nbsp;—&nbsp;
                                    <input
                                        disabled={
                                            !attr[index].val ? true : false
                                        }
                                        type="number"
                                        min={
                                            inputFilter[attr[index].val]?.min ||
                                            '20'
                                        }
                                        max="20"
                                        step="1"
                                        placeholder="20"
                                        id={attr[index].val2}
                                        name="max"
                                        value={
                                            inputFilter[attr[index].val]?.max ||
                                            ''
                                        } // || Помогает избежать ошибки с неконтролируемым изменением стейта
                                        onChange={inputHandler}
                                        style={{
                                            width: '40px',
                                            textAlign: 'center',
                                            backgroundColor: !attr[index].val
                                                ? '#9f7ca5'
                                                : '',
                                        }}
                                    />
                                    {/* Кнопка удаления инпута*/}
                                    {/* ______________________*/}
                                    <a
                                        href="#!"
                                        className="btn-floating btn-esmall waves-effect waves-light red lighten-2"
                                        onClick={() => {
                                            setAttr(
                                                attr.filter(
                                                    (_, i) => i !== index
                                                )
                                            ) // удаляем только нужный инпут
                                            // при удалении инпута сбрасываем стейт
                                            let state = { ...inputFilter }
                                            delete state[attr[index].val]
                                            setInputFilter(state)
                                        }}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        <i className="material-icons">remove</i>
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="modal-footer deep-purple lighten-1">
                    <a
                        href="#!"
                        onClick={closeModal}
                        className="btn-large waves-effect waves-light purple darken-4"
                    >
                        OK
                    </a>
                </div>
            </div>
        </div>,
        document.getElementById('modal-search')
    )
}

export default ModalAttributeSearch
