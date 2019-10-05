import * as types from "./action-types";

export function setUser(user: object) {
    return {
        type: types.SET_USER,
        payload: {
            user,
        }
    }
}