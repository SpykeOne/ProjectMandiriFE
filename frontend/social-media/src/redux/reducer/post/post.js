import post_types from "./type";

const init_state = {
    value: false
}

const post_reducer = (state= init_state, action) => {
    if(action.type == post_types.POST_AUTORENDER) {
        return{
            ...state,
            value: action.payload.value
            
        }
    }
    return state
}

export default post_reducer