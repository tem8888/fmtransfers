import axios from 'axios'
import Cookies from 'js-cookie'
import { 
	USER_LOADED,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	CLEAR_ERROR,
	SHORTLIST_RESET,
	} from './types'

//Check token and load user
export const loadUser = () => async (dispatch) => {

	const response = await axios.get('/auth/user', tokenConfig())
	dispatch({type: USER_LOADED, payload: response.data})	
}

// Login User
export const login = ({ username, password }) => async (dispatch) => {
	
	const config = {
		headers: {'Content-Type': 'application/json'} // Headers
	};
	const body = JSON.stringify({ username, password }); // Request body

	try {
		const res = await axios.post('/auth/login', body, config)
		dispatch({type: LOGIN_SUCCESS,payload: res.data})
	} catch(err) {
		dispatch({type: LOGIN_FAIL, payload: { errorMsg: 'Неверный логин или пароль'}})
	}
}

// Logout User
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT_SUCCESS })
	dispatch({ type: SHORTLIST_RESET })
};

export const cleanError = () => {
	return { type: CLEAR_ERROR }
};

const tokenConfig = () => {
	
	const token = Cookies.get('token') //get token from localStorage
	const config = { //Headers
		headers: {"Content-Type": "application/json"} 
	}
	if (token) { // If token, add to headers
		config.headers['x-auth-token'] = token
	} 

	return config
}