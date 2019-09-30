interface store {
    email:string
    premium:boolean
    indonesia:boolean
    download:{
        [key:string]:any
    }
}

const store:store = {
    email:'',
    premium:false,
    indonesia:false,
    download:{

    },
}


export const accounts = (state = store,actions)=>{
    switch (actions.type) {
        case "SET_ACCOUNTS":
            return {
                ...state,
                ...actions.payload
            }
        case "SET_INDONESIA":
            return {
                ...state,
                indonesia:actions.payload
            }
        case "SET_PREMIUM":
           return {
               ...state,
               premium:actions.payload
           }
        case "SET_DOWNLOAD":
            return {
                ...state,
                download:{
                    [actions.payload.id]:[...state.download[actions.payload.id],actions.payload.file]
                }
            }
        default:
            return state
    }
}
