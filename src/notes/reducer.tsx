import * as types from './action-types'
import snakeCase from 'lodash/snakeCase'

const initialState = {
    home: `This is a simple note taking app.

    Prepend any world with @ to create a new page, like @this.

    The entire page is editable, apart from the Home link at the top.`,
    this: `Isn't this easy?`
};

function handleSetNote(state, {label, content}) {
    return {
        ...state,
        [snakeCase(label)]: content,
    }
}


function notesReducer(state = initialState, action) {
    switch (action.type) {
        case (types.SET_NOTE): {
            return handleSetNote(state, action.payload)
        }
        default: {
            return state;
        }
    }
}

  export default notesReducer