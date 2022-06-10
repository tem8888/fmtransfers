import React from 'react'

const Button = (props) => {
    return (
        <a href="/#" 
            className={`btn waves-effect waves-light ${props.color || ''} ${props.disabled || ''}`} 
            onClick={props.onClick}
        >  
            {props.children}
        </a>
    )
}

export default Button