import axios from 'axios'
import Cookies from 'js-cookie'

//Check token and load user
export const loadUser = () => async (dispatch) => {

	const response = await axios.get('/auth/user', tokenConfig())
	dispatch({type: 'USER_LOADED', payload: response.data})	

}

// Login User
export const login = ({ username, password }) => async (dispatch) => {
	
	const config = {
		headers: {'Content-Type': 'application/json'} // Headers
	};
	const body = JSON.stringify({ username, password }); // Request body
	
  	dispatch({ type: 'USER_LOADING'})

	const res = await axios.post('/auth/login', body, config)
	dispatch({type: 'LOGIN_SUCCESS',payload: res.data})

}

// Logout User
export const logout = () => dispatch => {
	dispatch({ type: 'LOGOUT_SUCCESS' })
};


export const tokenConfig = () => {
	
	const token = Cookies.get('token') //get token from localStorage
	
	const config = { //Headers
		headers: {"Content-Type": "application/json"} 
	}
	if (token) { // If token, add to headers
		config.headers['x-auth-token'] = token
	} 

	return config
}