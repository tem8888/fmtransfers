import axios from 'axios'
import Cookies from 'js-cookie'

//Check token and load user
export const loadUser = () => async (dispatch) => {

	//User loading
	dispatch({ type: 'USER_LOADING'})
	await axios.get('/auth/user', tokenConfig())
			
		.then(res => { 
			dispatch({type: 'USER_LOADED', payload: res.data})

		})
		.catch((err) => {
			dispatch({ type: 'AUTH_ERROR' })
		})
}

// Login User
export const login = ({ username, password }) => async (dispatch) => {
  // Headers
  const config = {
    headers: {'Content-Type': 'application/json'}
  };

  // Request body
	const body = JSON.stringify({ username, password });
  	dispatch({ type: 'USER_LOADING'})
	await axios
		.post('/auth/login', body, config)
			.then(res => {
				dispatch({
					type: 'LOGIN_SUCCESS',
					payload: res.data
				})
			})
			.catch((err) => {
				dispatch({ 
					type: 'LOGIN_FAIL',
					payload: {errorMsg: err.response.data.msg}
				})
			})
}

// Logout User
export const logout = () => dispatch => {
	dispatch({ type: 'LOGOUT_SUCCESS' })
};


export const tokenConfig = () => {

	//get token from localStorage
	const token = Cookies.get('token')
	//Headers
	const config = { headers: {"Content-Type": "application/json"} }

	// If token, add to headers
	if (token) {config.headers['x-auth-token'] = token}

	return config
}