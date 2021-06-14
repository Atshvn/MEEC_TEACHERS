import {
    SET_USER_INFOR
} from './types.js';

function SystemReducers(state, action) {
    switch (action.type) {
        case SET_USER_INFOR:
            return {
                ...state,
                userInfor: action.userInfor,
            };
       
        default:
            return state;
    }
}

export default SystemReducers;