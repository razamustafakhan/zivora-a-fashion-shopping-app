const authReducer =(state,action) =>{
    switch(action.type){
        case "SET_LOADING":
            return {
                ...state,
                loading:true
            }

            case "SET_SUCCESS":
                return{
                    ...state,

                    loading:false
                }
                case "SIGN_UP":
                    return{
                        ...state,
                        registerForm:{
                            ...state.registerForm,
                            [action.payload.name] :action.payload.value
                        }
                    }
                case "SIGN_IN":
                    return{
                        ...state,
                        loginForm:{
                            ...state.loginForm,
                            [action.payload.name] :action.payload.value
                        }
                    }
        default:
            return state
    }
}

export default authReducer