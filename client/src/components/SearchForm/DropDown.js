import React from 'react'

const DropDown = ({label, id, options, inputFilter, inputHandler}) => {

    const renderOptions = options.map((option, index) => {
        return (
            <option key={index} value={option.value}>{option.label}</option>
        )
    })

    return (
        <div className='row input-row'>
            <div className='col s4'>
                <label htmlFor={id}>{label} &nbsp;</label>
            </div>
            <div className='col s8'>
                <select
                    className='input-field inline'
                    value={inputFilter[id] || ''}
                    onChange={inputHandler}
                    id={id}
                >
                    {renderOptions}
                </select>
            </div>
        </div>
    )
}

export default DropDown