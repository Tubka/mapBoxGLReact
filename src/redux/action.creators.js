import { actionTypes } from './action.types'

export const reduxAddCoords = (coords) => {
    return {
        type: actionTypes.ADD_COORDS,
        coords
    }
}
export const reduxEditCoords = () => {
    return {
        type: actionTypes.EDIT_COORDS,
    }
}
export const removeCoords = (idToRemove) => {
    return {
        type: actionTypes.REMOVE_COORDS,
        idToRemove
    }
}
export const setNull = () => {
    return {
        type: actionTypes.SET_NULL,
    }
}