import React from 'react'
import {ACTION_SET_VALUE} from './ActionTypes'
export function setValue(value) {
    return {
        type: ACTION_SET_VALUE,
        value: value
    }
}

