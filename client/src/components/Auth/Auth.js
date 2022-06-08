import React from 'react'
import {connect} from 'react-redux'
import AuthForm from './AuthForm.js'
import AuthSuccess from './AuthSuccess.js'
import './auth.css';

const Auth = ({isAuthenticated}) => {

	return (
		<div className='row'>
			{isAuthenticated ? <AuthSuccess /> : <AuthForm /> }
    	</div>
	)
}


const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Auth)