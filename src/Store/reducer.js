import * as actionTypes from './actionTypes';
import { updateObject } from './utility';

const initialState = {
  displayedCartoon: 1,
  lastCartoon: 1
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

const getLastCartoon = ( state ) => {
  return state.lastCartoon;
};

const setLastCartoon = (state, action) => {
  console.log(state.lastCartoon, action.lastCartoon);
  return updateObject( state, {
    lastCartoon: action.lastCartoon
  });
}

const reducer = ( state = initialState, action ) => {
  console.log(state.lastCartoon);
  switch ( action.type ) {
    case actionTypes.GET_LASTCARTOON: return getLastCartoon(state);
    case actionTypes.SET_LASTCARTOON: return setLastCartoon(state, action);
    default: return state;
  }
};

export default reducer;
