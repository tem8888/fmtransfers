import React from 'react';
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import allReducers from './store/reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';

import App from './App';
import 'materialize-css'
import './index.css';

    const store = createStore(allReducers,
	 compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

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