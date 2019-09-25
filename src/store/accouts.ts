interface store {
    premium:boolean
}

const store:store = {
    premium:true
}

export const accounts = (state = store,actions)=>{
    return {
        ...state
    }
}
