import { createStore } from 'redux'


import SliderApp from './Reducer'
const initialState = {
    
}
const store = createStore(SliderApp, initialState)
export default  store