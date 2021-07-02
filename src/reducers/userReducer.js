const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';

const defaultState = {
    currentUser: {},
    isAuth: false,
    space: null,
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            const { usedSpace } = action.payload;
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                space: usedSpace,
            }
        
        case LOGOUT:
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default: 
            return state
    }
}

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const doExit = () => ({ type: LOGOUT })