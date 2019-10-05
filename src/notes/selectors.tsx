import {createSelector} from 'reselect'
import snakeCase from 'lodash/snakeCase'

export const getState = state => state.notes

export const makeGetNoteByLabel = label => {
    return createSelector([getState], (state) => state[snakeCase(label)])
}