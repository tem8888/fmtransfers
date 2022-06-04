import {loadUser} from './authActions'
import {loadPlayers} from './playerListActions'
import {loadShortList} from './shortListActions'
import {loadSquad} from './squadListActions'
import { login } from './authActions'

// Стартовая загрузка всех данных
// ждем получение данных о пользователе, после решаем нужно ли отсылать запрос на получение списков состава и шортлиста
export const initialFetch = () => async (dispatch, getState) => {

    // Загружаем основной список игроков
    dispatch(loadPlayers())

    try { 
        await dispatch(loadUser())
        const isAuthenticated = getState().auth.isAuthenticated
    
        if (isAuthenticated) { // Если авторизация по токену прошла успешно, догружаем состав и шортлист
            const club = getState().auth.user.club

            dispatch(loadSquad(club))
            dispatch(loadShortList(club))
        }
    } catch (err) {
        console.log(err)    
    } 
}

// Авторизация пользователя
// После успешной авторизации грузим данные о составе и шортлист
export const LoginAndFetchSquad = (inputLogin) => async (dispatch, getState) => {
    try {
        await dispatch(login(inputLogin))

        const club = getState().auth.user.club
        dispatch(loadSquad(club))
	    dispatch(loadShortList(club))
    } catch (err) {
        console.log(err)
    }
}