export const POSTS_HOME_NOVEL = "POSTS_HOME_NOVEL"
export const POSTS_HOME_POPULER = "POSTS_HOME_POPULER"
export const POSTS_HOME_RECENTS = "POSTS_HOME_RECENTS"

const store = {
    Home:[],
    Populer:[],
    Recents:[]   
}

export const novel = (state = store,actions) => {
    switch (actions.type) {
        case POSTS_HOME_NOVEL:
            return {
                ...state,
                Home:actions.payload
            };
        case POSTS_HOME_POPULER:
            return {
                ...state,
                Populer:actions.payload
            }
        case POSTS_HOME_RECENTS:
            return {
                ...state,
                Recents:actions.payload
            }
        default:
            return state
    }
}