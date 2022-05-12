import React from 'react'
import M from 'materialize-css'

const CopyUID = ({ playerId }) => {

    const copyHandler = (e) => {
		e.preventDefault()

        navigator.clipboard.writeText(playerId)
        M.toast({html: 'ID скопирован', classes: 'my-toast'})
	}

    return (
        
        <div className="col s6 m6 center-align">
             <a href="/#" className={"btn waves-effect waves-light teal lighten-2"} onClick={(e) => {copyHandler(e)}}>
                Copy ID
            </a>
        </div>
    )
}


export default CopyUID
