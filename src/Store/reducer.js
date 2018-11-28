import * as actionTypes from './actionTypes';
import { updateObject } from './utility';

const initialState = {
  displayedCartoon: 0,
  lastCartoon: 0
};

const displayPreviousCartoon = ( state ) => {
  return updateObject( state, {
    displayedCartoon: state.displayedCartoon - 1
  });
}

const displayNextCartoon = ( state ) => {
  return updateObject( state, {
    displayedCartoon: state.displayedCartoon + 1
  })
}

const setDisplayedCartoon = ( state, action ) => {
  return updateObject( state, {
    displayedCartoon: action.displayedCartoon
  });
}

const setLastCartoon = ( state, action ) => {
  return updateObject( state, {
    lastCartoon: action.lastCartoon
  });
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_LASTCARTOON: return setLastCartoon(state, action);
    case actionTypes.DISPLAY_PREVIOUS_CARTOON: return displayPreviousCartoon(state, action);
    case actionTypes.DISPLAY_NEXT_CARTOON: return displayNextCartoon(state, action);
    case actionTypes.SET_DISPLAYEDCARTOON: return setDisplayedCartoon(state, action);
    default: return state;
  }
};

export default reducer;
