import Cookies from 'js-cookie'

const initialState = {
	token: Cookies.get('token'),
	isAuthenticated: null,
	isLoading: true,
	user: {club: ''},
	errorMsg: ''
}

const authReducer = function(state = initialState, action) {
	switch(action.type) {

		case "USER_LOADED":
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload
			};

		case "USER_UPDATE":
			return {
				...state,
				user: {...state.user, money: action.payload.money}
			};

		case 'LOGIN_SUCCESS':
			Cookies.set('token', action.payload.token, { expires: 7, sameSite:'Strict', secure: true});
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
				errorMsg: ''
			};

		case 'AUTH_ERROR':
		case 'LOGOUT_SUCCESS':
			Cookies.remove('token', { path: '', secure: true });
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: true,
			}

		case 'LOGIN_FAIL':
			return {...state, errorMsg: action.payload.errorMsg}

		default:
			return state
	}
}
export default authReducer