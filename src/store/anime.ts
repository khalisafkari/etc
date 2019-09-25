export const POSTS_HOME_ANIME = "POSTS_HOME_ANIME"
export const POSTS_HOME_RECOMMENDED = "POSTS_HOME_RECOMMENDED";
export const POSTS_LIST_ANIME = "POSTS_LIST_ANIME"

const store = {
    Home:[],
    Recommend:[],
    List:[]
}

export const anime = (state = store,actions) => {
    switch (actions.type) {
        case POSTS_HOME_ANIME:
            const todos = []
            for(let i = 0; i < actions.payload.length;i++){
                if(actions.payload[i].id.indexOf('/movie/') !== -1){
                }else{
                    todos.push(actions.payload[i])
                }
            }
            return {
                ...state,
                Home:todos.slice(1)
            };
        case POSTS_HOME_RECOMMENDED:
            const todo = []
            for(let i = 0; i < actions.payload.length;i++){
                if(actions.payload[i].id.indexOf('/movie/') !== -1){
                }else{
                    todo.push(actions.payload[i])
                }
            }
            return {
                ...state,
                Recommend:todo
            };
        case POSTS_LIST_ANIME:
            console.log(actions.payload)
            return {
                ...state,
                List:actions.payload
            }
        default:
            return state
    }
}