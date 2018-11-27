import * as actionTypes from './actionTypes';
import { updateObject } from './utility';

const initialState = {
  displayedCartoon: 0,
  lastCartoon: 0
};

const updateDisplayedCartoon = ( state, action ) => {
  // const updateDisplayedCartoon = { [action.displayedCartoon]: state.displayedCartoon }
  // const updatedDisplayedCartoon = updateObject( state.displayedCartoon, updateDisplayedCartoon );
  // const updatedState = {
  //   displayedCartoon: updatedDisplayedCartoon
  // }
  // return updateObject( state, updatedState );
  return updateObject( state, {
    displayedCartoon: action.displayedCartoon
  });
}

const setLastCartoon = (state, action) => {
  return updateObject( state, {
    lastCartoon: action.lastCartoon
  });
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_LASTCARTOON: return setLastCartoon(state, action);
    default: return state;
  }
};

export default reducer;
