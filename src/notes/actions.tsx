import * as types from './action-types'

export const setNote = ({label, content, id=null, persist=true}) => ({
    type: types.SET_NOTE,
    payload: {
        id, label, content, persist
    }
})