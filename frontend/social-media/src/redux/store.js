import { combineReducers } from "redux";
import { auth_reducer } from "./reducer/auth/auth";
import  post_reducer  from "./reducer/post/post";

export const rootReducer = combineReducers({
    auth: auth_reducer,
    post: post_reducer
})