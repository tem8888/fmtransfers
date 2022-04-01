import playerListReducer from './playerListReducer'
import authReducer from './authReducer.js'
import squadListReducer from './squadListReducer.js'
import shortListReducer from './shortListReducer.js'

import {combineReducers} from 'redux'

const allReducers = combineReducers({
	playersList: playerListReducer,
	auth: authReducer,
	squadList: squadListReducer,
	shortState: shortListReducer
})

export default allReducers