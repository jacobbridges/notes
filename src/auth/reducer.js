import * as types from './action-types'

const initialState = {
    user: null
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_USER: {
            return {
                ...state,
                user: action.payload.user,
            }
        }
        default: {
            return state
        }
    }
}

export default authReducer