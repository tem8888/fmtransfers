import React from 'react'

import {connect} from 'react-redux'
const {logout} = require('../../store/actions/authActions.js')

const AuthSuccess = ({auth, loadUser, logout}) => {

	const submitLogoutHandler = (e) => {
		e.preventDefault()
		logout()
	}

	return (
		!auth.isLoading &&

			<div className="auth__succes valign-wrapper" >

				<div className="col s6 center-align">
					<div>Hello, <b>{auth.user.username}</b></div>
					<button className="waves-effect waves-light btn-small btn-logout" type="submit" onClick={submitLogoutHandler}>Logout</button>
				</div>
				<h6 className="col s6 center-align">
					<div>{auth.user.club}</div>
					<div className="auth__money">{auth.user.money.toFixed(2)}</div>
				</h6>
			</div>	
	)
}

const mapStateToProps = state => ({
	auth: state.auth,
});

const mapDispatchtoProps = (dispatch) => ({
	logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchtoProps)(AuthSuccess)