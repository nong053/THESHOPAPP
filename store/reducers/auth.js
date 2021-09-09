import { LOGIN, SIGNUP } from "../actions/auth"

const initalState = {
    token: null,
    userId: null
}
export default (state = initalState, action) => {
    switch (action.type) {
        case LOGIN:
            return{
                token:action.token,
                userId:action.userId
            };
        case SIGNUP:
            return{
                token:action.token,
                userId:action.userId
            }
        default:
            return state;
    }
}