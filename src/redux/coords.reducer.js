import { actionTypes } from "./action.types";

const initialState = {
  actualCoords: [],
  idToRemove: null
};

const coordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COORDS:
            console.log(state)
            return {
                ...state,
                actualCoords: [...state.actualCoords, action.coords]
            } 

        case actionTypes.EDIT_COORDS:
            return state

        case actionTypes.REMOVE_COORDS:
            console.log(state)
            return ({
                ...state,
                idToRemove: action.idToRemove,
                actualCoords: state.actualCoords.filter(el => el.id !== action.idToRemove)
            })

        case actionTypes.SET_NULL:
            console.log(state)
            return ({
                ...state,
                idToRemove: null,
            })
        
        default:
            return state; 
    }
}

export default coordsReducer