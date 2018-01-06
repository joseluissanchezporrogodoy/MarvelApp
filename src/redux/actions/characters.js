import * as types from '../types/characters'
import { fetch } from 'marvel_app/src/webservices/webservices'
import * as constants from 'marvel_app/src/webservices/constants.js'


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

        dispatch(setCharactersFetching(true))

        const fetchUrl =
            constants.CHARACTERS_ENDPOINT +
            constants.TIMESTAMP +
            constants.PUBLIC_API +
            constants.HASH +
            '&limit=10'
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