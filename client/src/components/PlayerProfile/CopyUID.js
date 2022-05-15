import React from 'react'
import M from 'materialize-css'

const CopyUID = ({ playerId }) => {

    const copyHandler = (e) => {
		e.preventDefault()

        // Говорят, такие манипуляции позволяют работать кнопке копирования в браузерах не поддерживающих Clipboard API
        const el = document.createElement('textarea');
        el.value = playerId;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        M.toast({html: 'ID скопирован', classes: 'my-toast'})
	}

    return (
        
        <div className="col s12 m6 center-align button-margin">
             <a href="/#" className={"btn waves-effect waves-light teal lighten-2"} onClick={(e) => {copyHandler(e)}}>
                Copy ID
            </a>
        </div>
    )
}


export default CopyUID
