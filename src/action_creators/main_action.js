
import {push} from 'react-router-redux';
import {UPDATE_ORIGIN,UPDATE_DESTINATION, CALCULATE} from "../constants/action_types";
import {calculateDistance} from "../utils/utils.js"

export function originSelect(place){
    return{
        type:UPDATE_ORIGIN,
        origin:place.value,
    }
}

export function destinationSelect(place){
    return{
        type:UPDATE_DESTINATION,
        destination: place.value,
    }
}

function  distance(distance,latLngList){
    return {
        type:CALCULATE,
        distance: distance,
        latLngList: latLngList,
    }
}

export function calculate(){

    return(dispatch, getState)=>{
        let origin  = getState().origin;
        let destination =  getState().destination;
        let d = calculateDistance(origin.lat, origin.lon, destination.lat, destination.lon,"N");
        let latLngList = [[origin.lat, origin.lon],[destination.lat,  destination.lon]];
       dispatch(distance(d,latLngList))
    }
}



