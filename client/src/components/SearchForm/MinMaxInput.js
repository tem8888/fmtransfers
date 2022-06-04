import React from 'react'

const MinMaxInput = ({
    label, 
    id, 
    min, 
    max = 999999, 
    step, 
    inputFilter, 
    inputHandler,
}) => {

  return (
    <div className='row input-row valign-wrapper'>
        <div className='col s4'>{label} &nbsp;</div>
        <div className='col s4 input-field inline'>
            <input
                placeholder='min'
                id={`${id}_1`}
                name='min'
                type='number'
                min={min}
                max={max}
                step={step}
                value={inputFilter?.[id]?.min || ''}
                onChange={inputHandler}
            />
        </div>
        <div className='col s4 input-field inline'>
            <input
                placeholder='max'
                id={`${id}_2`}
                type='number'
                name='max'
                min={min}
                max={max}
                step={step}
                value={inputFilter?.[id]?.max || ''}
                onChange={inputHandler}
            />
        </div>
    </div> 
  )
}

export default MinMaxInput