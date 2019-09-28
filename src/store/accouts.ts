interface store {
    email:string
    premium:boolean
    indonesia:boolean
}

const store:store = {
    email:'',
    premium:false,
    indonesia:false
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
        default:
            return state
    }
}
