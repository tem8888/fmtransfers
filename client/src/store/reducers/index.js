import playerListReducer from './playerListReducer'
import authReducer from './authReducer.js'
import squadListReducer from './squadListReducer.js'
import bidReducer from './bidReducer.js'

import {combineReducers} from 'redux'

const allReducers = combineReducers({
	playersList: playerListReducer,
	auth: authReducer,
	squadList: squadListReducer,
	bidState: bidReducer
})

export default allReducers