import React from 'react';
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import allReducers from './store/reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';

import App from './App';
//import 'materialize-css'
import './index.css';

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 // const store = createStore(allReducers, applyMiddleware(thunk),
 const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)))

render(
  <React.StrictMode>
  	<Provider store={store}>
    	<App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

/* 
При переходе к списку Состава и при выборе только первого игрока делается запрос к базе на получение инормации о биде (такой не существует)
*/