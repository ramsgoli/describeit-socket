import {fromJS} from 'immutable'

// constants
const CREATE_GAME_START = fromJS('create_game_start')
const CREATE_GAME_SUCCESS = fromJS('create_game_success')
const CREATE_GAME_FAILURE = fromJS('create_game_failure')

const JOIN_GAME_START = fromJS('create_game_start')
const JOIN_GAME_SUCCESS = fromJS('create_game_success')
const JOIN_GAME_FAILURE = fromJS('create_game_failure')

// actions
export const createGameStart = () => {
    return {
        type: CREATE_GAME_START
    }
}

export const createGameSuccess = () => {
    return {
        type: CREATE_GAME_SUCCESS
    }
}

export const createGameFailure = (errors) => {
    return {
        type: CREATE_GAME_FAILURE,
        errors
    }
}

export const joinGameStart = () => {
    return {
        type: JOIN_GAME_START
    }
}

export const joinGameSuccess = () => {
    return {
        type: JOIN_GAME_SUCCESS
    }
}

export const joinGameFailure = () => {
    return {
        type: JOIN_GAME_FAILURE
    }
}


// reducer
const initialState = fromJS({
    _internal: {
        loading: false,
        errors: []
    },
})

export const Home = (state=initialState, action) => {
    switch(action.type) {
        case CREATE_GAME_START: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], true)
            })
        }
        case JOIN_GAME_START: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], true)
            })
        }
        case CREATE_GAME_SUCCESS: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], false)
            })
        }
        case CREATE_GAME_FAILURE: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], false)
                val.setIn(['_internal', 'errors'], action.errors)
            })
        }
        default:
            return state
    }
}
