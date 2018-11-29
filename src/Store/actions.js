import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setLastCartoon = ( data ) => {
  return {
    type: actionTypes.SET_LASTCARTOON,
    lastCartoon: data
  }
}

export const setCurrentDisplayedCartoon = ( data ) => {
  return {
    type: actionTypes.SET_CURRENT_DISPLAYED_CARTOONS,
    currentDisplayedCartoon: data
  }
}

export const displayPreviousCartoon = ( ) => {
  return {
    type: actionTypes.DISPLAY_PREVIOUS_CARTOON,
  }
}

export const displayNextCartoon = ( ) => {
  return {
    type: actionTypes.DISPLAY_NEXT_CARTOON,
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
          dispatch( setLastCartoon(response.data.lastCartoon) );
        })
        .catch( error => {
          console.log( error );
        });
  };
};
