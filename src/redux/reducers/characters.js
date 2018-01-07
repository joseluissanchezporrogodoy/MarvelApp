import * as types from '../types/characters'

const initialState = {
    isFetching: false,
    list:[],
    total: 0,
    offset:0,
    item: null,
}

export default function reducer(state = initialState, action = {} ){
    switch (action.type){

        case types.CHARACTERS_UPDATE_LIST:
            return {
                ...state,//HACEMOS UNA COPIA DEL STATE
                list: action.value,
                total: action.total,
            };
        case types.CHARACTERS_UPDATE_LIST_OFFSET:
            return {
                ...state,//HACEMOS UNA COPIA DEL STATE
                offset: action.value,
            };
        
        case types.CHARACTERS_UPDATE_CHARACTER:
            return {
                ...state,
                item: action.value
            }    
        
        case types.CHARACTERS_SET_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }    

        default:
            return state;
    }
}