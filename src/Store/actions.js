import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setLastCartoon = ( data ) => {
  console.log(data.lastCartoon)
  return {
    type: actionTypes.SET_LASTCARTOON,
    lastCartoon: data.lastCartoon
  }
}

export const getLastCartoon = () => {
  return {
    type:actionTypes.GET_LASTCARTOON
  }
}

export const initLastCartoon = () => {
  return dispatch => {
    axios.get( 'https://raw.githubusercontent.com/nathanarohde/vfd_home_site/master/src/Cartoons/Cartoons.json' )
        .then( response => {
          dispatch( setLastCartoon(response.data) );
        })
        .catch( error => {
          console.log( error );
        });
  };
};
