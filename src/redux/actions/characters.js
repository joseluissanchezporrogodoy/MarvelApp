import * as types from '../types/characters'
import { fetch } from 'marvel_app/src/webservices/webservices'
import * as constants from 'marvel_app/src/webservices/constants.js'
import qs from 'qs'
import {Actions} from 'react-native-router-flux'
function updateCharactersList(value,total) {
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value: value,
        total: total,
    }
}
export function updateCharactersListOffset(value){
    return {
        type: types.CHARACTERS_UPDATE_LIST_OFFSET,
        value
    }
}
export function initCharactersList(){
    return (dispatch,getState)=>{
        // Reset characters list and set total to 0
        dispatch(updateCharactersList([],0))

        // Set offset to 0
        dispatch(updateCharactersListOffset(0))

        // Fetch list
        dispatch(fetchCharactersList())

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
        type: types.CHARACTERS_UPDATE_CHARACTER,
        value: value,
    }
}
export function fetchCharactersList() { // Funcion que carga del WS el listado
    return (dispatch, getState) => {
    
        const state = getState()
        const list = state.characters.list
        const offset = state.characters.offset
        const limit = 10
        const filters = {
            offset: offset,
            limit: limit
        }

        dispatch(setCharactersFetching(true))

        const fetchUrl =
            constants.CHARACTERS_ENDPOINT +
            constants.TIMESTAMP +
            constants.PUBLIC_API +
            constants.HASH +
            qs.stringify(filters)
        console.log('URL',fetchUrl)
        fetch(fetchUrl).then(response => {
            console.log("fetch response personajes:", response);
            dispatch(setCharactersFetching(false))
            const newList = response && response.data && response.data.results ? [...list, ...response.data.results] : []
            console.log("New list length: ", newList.length)
            console.log("total",response.data.total)
            dispatch(updateCharactersList(newList,response.data.total))
            
        })
        .catch((error) => {
                console.log("error:", error);
                dispatch(setCharactersFetching(false))
        });
       
    }
}
export function postCharacter(character) {
    
    return (dispatch, getState) => {
        
        
       /// TODO: HACER un pop
        //dispatch(setCharactersFetching(true))
        const state = getState()
        console.log("poscahcarfgesgsw",state)
        const list = state.characters.list
        const newList = [character,...list]
        dispatch(updateCharactersList(newList,state.characters.total))
        Actions.pop()
    }
} 