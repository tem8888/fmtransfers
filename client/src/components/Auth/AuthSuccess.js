import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../store/actions/authActions.js'

const AuthSuccess = ({user, logout}) => {

	const submitLogoutHandler = (e) => {
		e.preventDefault()
		logout()
	}

	return (
		<div className="auth__succes valign-wrapper" >

			<div className="col s6 center-align">
				<div>Hello, <b>{user.username}</b></div>
				<button className="waves-effect waves-light btn-small btn-logout" type="submit" onClick={submitLogoutHandler}>Logout</button>
			</div>
			<h6 className="col s6 center-align">
				<div>{user.club}</div>
				<div className="auth__money">{user.money.toFixed(2)}</div>
			</h6>
		</div>	
	)
}

const mapStateToProps = state => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, {logout})(AuthSuccess)