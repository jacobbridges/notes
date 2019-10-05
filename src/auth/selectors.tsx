import { createSelector } from 'reselect'

export const getState = state => state.auth
export const getUser = createSelector([getState], (state) => state.user )
