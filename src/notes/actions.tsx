import * as types from './action-types'

export const setNote = (label: string, content: string) => ({
    type: types.SET_NOTE,
    payload: {
        label, content
    }
})