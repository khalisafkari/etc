interface store {
    email:string
    premium:boolean
    indonesia:boolean
    download:any
}

const store:store = {
    email:'',
    premium:false,
    indonesia:false,
    download:{},
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
                ...state
            }
        default:
            return state
    }
}
