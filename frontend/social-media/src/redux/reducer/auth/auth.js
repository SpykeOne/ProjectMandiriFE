import auth_types from "./type";

const init_state = {
    id : 0,
    username: "",
    email: "",
    password: "",
    full_name: "",
    bio:"",
    avatar: "",
    is_verified: false
  };

 export function auth_reducer(state = init_state, action) {

    if(action.type === auth_types.AUTH_LOGIN){
      return{
        ...state,
        id : action.payload?.id,
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        full_name: action.payload.full_name,
        avatar: action.payload.avatar,
        bio: action.payload.bio,
        is_verified: action.payload.is_verified
      }
    }else if(action.type === auth_types.AUTH_LOGOUT){
      return init_state
    }
    
    return state;
  }
  
