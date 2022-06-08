import React, {useState} from 'react'
import {connect} from 'react-redux'
import { cleanError } from '../../store/actions/authActions.js'
import { LoginAndFetchSquad } from '../../store/actions/index.js'

const AuthForm = ({	errorMsg, LoginAndFetchSquad, cleanError }) => {

	const [inputLogin, setInputLogin] = useState({username: '',	password: ''})
	const [errors, setErrors] = useState({username: '',	password: ''})

	const inputLoginHandler = (e) => {
		if (inputLogin[e.target.name]) {
			setErrors({...errors, [e.target.name]: ""})
			cleanError()
		}
		setInputLogin({...inputLogin, [e.target.name]: e.target.value})
	}

	const submitLoginHandler = (e) => {
		e.preventDefault()

		if (inputLogin.username === '' && inputLogin.password === '') 
			return setErrors({username: "Не введен логин",  password: "Не введен пароль"})
		if (inputLogin.username === '') 
			return setErrors({...errors, username: "Не введен логин"})
		if (inputLogin.password === '') 
			return setErrors({...errors, password: "Не введен пароль"})

		LoginAndFetchSquad(inputLogin)
	}

	const errorMessage = () => {
		if (errorMsg) 
			return <div className="error-msg">{errorMsg}</div>
		else if (errors.username && errors.password)
			return <div className="error-msg">{errors.username}<br/>{errors.password}</div>
		else if (errors.username)
			return <div className="error-msg">{errors.username}</div>
		else if (errors.password)
			return <div className="error-msg">{errors.password}</div>
		return null
	}

	return (
		<form className="auth__form center-align" onSubmit={submitLoginHandler}>
			<div className="col l6 m2 s4">
				<input 
					className={(errors.username || errorMsg) ? "auth__input invalid" :  "auth__input" }
					type="text" 
					placeholder="username" 
					name="username"
					value={inputLogin.username} 
					onChange={inputLoginHandler}
				/>
				<input 
					className={(errors.password || errorMsg) ? "auth__input invalid" : "auth__input" } 
					type="password" 
					placeholder="password" 
					name="password"
					value={inputLogin.password} 
					onChange={inputLoginHandler}
				/>
				{errorMessage()}
			</div>
			<div className="col l6 m2 s4">
				<button className="waves-effect waves-light btn-large btn-login" type="submit">
					Login
				</button>
			</div>
		</form>
	)
}


const mapStateToProps = state => ({
	errorMsg: state.auth.errorMsg
});

export default connect(mapStateToProps, {LoginAndFetchSquad, cleanError})(AuthForm)