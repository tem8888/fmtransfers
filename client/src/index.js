import React from 'react';
// import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import allReducers from './store/reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import App from './App';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(allReducers, applyMiddleware(thunk),
const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)))
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//   	<Provider store={store}>
//     	<App />
//     </Provider>
//   </React.StrictMode>,
// )

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

/* 
При переходе к списку Состава и при выборе только первого игрока делается запрос к базе на получение инормации о биде (такой не существует)
*/