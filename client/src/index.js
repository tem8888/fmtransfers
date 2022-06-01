import React from 'react';
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import allReducers from './store/reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import "@fontsource/exo-2"
import './index.css';

import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)