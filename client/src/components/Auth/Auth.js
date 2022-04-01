import React from 'react'
import {connect} from 'react-redux'
import AuthForm from './AuthForm.js'
import AuthSuccess from './AuthSuccess.js'
import './auth.css';

const Auth = ({auth}) => {

	return (
		<div className='row'>
			{!auth.isAuthenticated ? 
					<AuthForm />
			:
					<AuthSuccess />
			}
    	</div>
	)
}


const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Auth)