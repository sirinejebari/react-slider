import * as Actions from './ActionTypes'
import { combineReducers } from 'redux'

const initialState = {

}

export function formValue(state = initialState, action) {

    switch (action.type) {
        case Actions.ACTION_SET_VALUE:
            return Object.assign(state, action.value)
        default:
            return state;
    }

}

const SliderApp = combineReducers({
    formValue

})

export default SliderApp