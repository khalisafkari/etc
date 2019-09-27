interface store {
    email:string
    premium:boolean
}

const store:store = {
    email:'',
    premium:false
}

export const accounts = (state = store,actions)=>{
    switch (actions.type) {
        case "SET_ACCOUNTS":
            console.log({
                ...state,
                ...actions.payload
            })
            return {
                ...state,
                ...actions.payload
            }
        default:
            return state
    }
}
