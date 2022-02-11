import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { AuthForm } from './AuthForm.js'
import { AuthSuccess } from './AuthSuccess.js'
import './auth.css';
const {login, logout, loadUser} = require('../../store/actions/authActions.js')

const Auth = (props) => {
	const {login, logout, auth, loadUser, setIdPlayer} = props

	useEffect(() => { loadUser() 
	}, [loadUser]); /* Загрузка данных авторизации пользователя */

	const [inputLogin, setInputLogin] = useState({
		username: '',
		password: ''
	})
	const [errors, setErrors] = useState({
		username: '',
		password: ''
	})

/* ------------------------------------- */
/* Обработчик изменения текстовых полей */
/* ------------------------------------*/
	const inputLoginHandler = (e) => {
		if (inputLogin[e.target.name])
			setErrors({...errors, [e.target.name]: ""})

		setInputLogin({...inputLogin, [e.target.name]: e.target.value})
	}

/* -------------------------------- */
/* Обработчик нажатия кнопки LOGIN */
/* -------------------------------*/
	const submitLoginHandler = (e) => {
		e.preventDefault()

		if (!inputLogin.username && !inputLogin.password) 
			return setErrors({username: "Не введен логин",  password: "Не введен пароль"})
		if (!inputLogin.username) 
			return setErrors({...errors, username: "Не введен логин"})
		if (!inputLogin.password) 
			return setErrors({...errors, password: "Не введен пароль"})

		login(inputLogin)
		setIdPlayer('')
	}

/* -------------------------------- */
/* Обработчик нажатия кнопки LOGOUT */
/* -------------------------------*/
	const submitLogoutHandler = (e) => {
		e.preventDefault()
		logout()
	
	}

	return (
		<div className="row">
    	{!auth.isAuthenticated ? 
				<AuthForm 
					submitLoginHandler={submitLoginHandler} 
					inputLoginHandler={inputLoginHandler} 
					inputLogin={inputLogin}
					errorMsg={auth.errorMsg}
					errors={errors}/>
      :
				<AuthSuccess 
					submitLogoutHandler={submitLogoutHandler}
					club={auth.user.club}
					money={auth.user.money}
					username={auth.user.username}/>
      }
    </div>
	)
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchtoProps = (dispatch, inputLogin) => ({
	login: (inputLogin) => dispatch(login(inputLogin)),
	logout: () => dispatch(logout()),
	loadUser: () => dispatch(loadUser())
})

export default connect(mapStateToProps, mapDispatchtoProps)(Auth)