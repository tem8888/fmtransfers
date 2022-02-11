import React from 'react'

const ModalAttributeSearch = (props) => {
    const {inputFilter, inputHandler} = props
    return (
    <div id="modal1" className="modal d-dark darken">
        <div className="modal-content">
        <h4>Modal Header</h4>
        <div className="row">
            <div className="col s4">
                <div className='input-field inline'>
                    Вброс из аута
                    <input
                    placeholder=''
                    name='atleast'
                    id='thr'
                    type='text'
                    value={inputFilter.thr.atleast}
                    onChange={inputHandler}
                    />
                </div>
            </div>
            <div className="col s4">
            <div className='input-field inline'>
                    Вброс из аута
                    <input
                    placeholder=''
                    name='atleast'
                    id='lon'
                    type='text'
                    value={inputFilter.lon.atleast}
                    onChange={inputHandler}
                    />
                </div>
            </div>
            <div className="col s4"></div>
        </div>
        </div>
        <div className="modal-footer deep-purple lighten-2 grey-text text-lighten-5">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
    </div>
    )
}

export default ModalAttributeSearch