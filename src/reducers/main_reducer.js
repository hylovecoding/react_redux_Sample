
import {combineReducers} from 'redux';
import {UPDATE_ORIGIN,UPDATE_DESTINATION, CALCULATE} from "../constants/action_types.js"
import originalAirports  from "../airports.js";



function airports (state=[], action){
    return originalAirports.map((airport, index)=>{
        return {
            text: `${airport.code}    ${airport.name}`,
            value:airport
        }
    })
}


function destination(state={}, action){
    switch(action.type){
        case UPDATE_DESTINATION:
            return action.destination;
        default:
            return state;
    }
}

function origin(state={}, action){
    switch(action.type){
        case UPDATE_ORIGIN:
            return action.origin;
        default:
            return state;
    }
}

function distance(state= 0, action){
    switch(action.type){
        case CALCULATE:
            return action.distance;
        default:
            return state;
    }
}

function latLngList(state= [], action){
    switch(action.type){
        case CALCULATE:
            return action.latLngList;
        default:
            return state;
    }
}

export default combineReducers({
    destination,
    origin,
    distance,
    latLngList,
    airports
});

//if we dont use combineReducers method
//http://redux.js.org/docs/basics/Reducers.html
// function mainReducer(state = {}, action){
//     return{
//         tabName: updateTabName(state.tabName, action),
//         username:updateUsername(state.username,action),
//     }
// }

