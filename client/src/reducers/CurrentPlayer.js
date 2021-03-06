import { fromJS } from 'immutable'
import Config from '../config'
import handleErrors from './Errors'
/*
CONSTANTS
 */

const SET_PLAYER_NAME = Symbol('SET_PLAYER_NAME')
const SET_PLAYER_ID = Symbol('SET_PLAYER_ID')
const SET_SOCKET_ID = Symbol('SET_SOCKET_ID')

const ADD_SUBMISSION_SUCCESS = Symbol('ADD_SUBMISSION_SUCCESS');
const ADD_SUBMISSION_ERROR = Symbol('ADD_SUBMISSION_ERROR');

/*
ACTIONS
 */

export const setPlayerName = (name) => {
    return {
        type: SET_PLAYER_NAME,
        name
    }
}

export const setSocketId = (id) => {
    return {
        type: SET_SOCKET_ID,
        id
    }
}

export const setPlayerId = (id) => {
    return {
        type: SET_PLAYER_ID,
        id
    }
}

const setSubmission = (submission) => {
    return {
        type: ADD_SUBMISSION_SUCCESS,
        submission
    }
}


export const addSubmission = submission => (dispatch, getState) => {
    const { CurrentPlayer } = getState()
    const playerId = CurrentPlayer.get('id')

    fetch(`${Config.API_URL}/users/${playerId}/submissions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            submission
        })
    })
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
            dispatch(setSubmission(res.submission))
        })
        .catch(error => {
            error.response.json().then(err => {
                dispatch({
                    type: ADD_SUBMISSION_ERROR,
                    error: err.message
                });
            })
        })
}

/*
 REDUCERS
 */

const initialState = fromJS({
    id: null,
    socketId: "",
    name: "",
    submission: "" ,
    _internal: {
        submitted: false,
        error: null
    }
})


export const CurrentPlayer = (state=initialState, action) => {
    switch (action.type) {
        case SET_PLAYER_ID: {
            return state.withMutations(val => {
                val.set('id', action.id)
            })
        }
        case SET_SOCKET_ID: {
            return state.withMutations(val => {
                 val.set('socketId', action.id)
            })
        }
        case SET_PLAYER_NAME: {
            return state.withMutations(val => {
                val.set('name', action.name)
            })
        }
        case ADD_SUBMISSION_SUCCESS: {
            return state.withMutations(val => {
                val.set('submission', fromJS(action.submission))
                val.setIn(['_internal', 'submitted'], true);
            })
        }
        case ADD_SUBMISSION_ERROR: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'error'], action.error.message);
            })
        }

        default:
            return state
    }
}

