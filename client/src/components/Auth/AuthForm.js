import React, {useState} from 'react'
import {connect} from 'react-redux'
const {login} = require('../../store/actions/authActions.js')

const AuthForm = ({	auth, login	}) => {

	const [inputLogin, setInputLogin] = useState({
			username: '',
			password: ''
		})
		const [errors, setErrors] = useState({
			username: '',
			password: ''
		})

	const inputLoginHandler = (e) => {
			if (inputLogin[e.target.name])
				setErrors({...errors, [e.target.name]: ""})

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

		login(inputLogin)
	}

	return (
		<form className="auth__form center-align" onSubmit={submitLoginHandler}>
			<div className="col l6 m2 s4">
				<input 
					className={!errors.username ? "auth__input" : "auth__input invalid"}
					type="text" 
					placeholder="username" 
					name="username"
					value={inputLogin.username} 
					onChange={inputLoginHandler}
				/>
				<input 
					className={!errors.password ? "auth__input" : "auth__input invalid"} 
					type="password" 
					placeholder="password" 
					name="password"
					value={inputLogin.password} 
					onChange={inputLoginHandler}
				/>
				<div className="error-msg ">
					{auth.errorMsg || (errors.username || errors.password) ? "Ошибка авторизации" : ""}
				</div>
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
	auth: state.auth,
});

const mapDispatchtoProps = (dispatch) => ({
	login: (inputLogin) => dispatch(login(inputLogin))
})

export default connect(mapStateToProps, mapDispatchtoProps)(AuthForm)