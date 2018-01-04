import * as types from '../types/characters'
import { fetch } from 'marvel_app/src/webservices/webservices'

function updateCharactersList(value) {
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value: value,
    }
}
function setCharactersFetching(value){
    return{
        type: types.CHARACTERS_SET_FETCHING,
        value //Se puede poner así pues coincide la clave y el valor
    }
}
export function updateCharacterSelected(value){
    console.log("update selected: value:",value)
    return{
        type: types.CHARACTERS_UPDATE_HOUSE,
        value: value,
    }
}
export function fetchCharactersList() { // Funcion que carga del WS el listado
    return (dispatch, getState) => {
    
        const state = getState()
        
        dispatch(updateCharactersList([]))
        const fetchUrl = '/characters?ts=1&apikey=7fd1361f95e6c90222509dfd37278f75&hash=e36a5432ef4df8b2220b68479f0f13a2&limit=10'

        dispatch(setCharactersFetching(true))
        
        fetch(fetchUrl).then(response => {
            console.log("fetch response personajes:", response);
            dispatch(setCharactersFetching(false))
            const list = response && response.data && response.data.results ? response.data.results : []
            dispatch(updateCharactersList(list))
            
        })
        .catch((error) => {
                console.log("error:", error);
                dispatch(setCharactersFetching(false))
        });
       
    }
}