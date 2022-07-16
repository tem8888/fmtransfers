import React from 'react'

const Button = ({children, onClick, color = '', disabled= ''}) => {
    return (
        <a href="/#" 
            className={`btn waves-effect waves-light ${color} ${disabled}`} 
            onClick={onClick}
        >  
            {children}
        </a>
    )
}

export default Button