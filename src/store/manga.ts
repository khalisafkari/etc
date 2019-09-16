export const POSTS_HOME_MANGA = "POSTS_HOME_MANGA"
export const POSTS_LIST_MANGA = "POSTS_LIST_MANGA"
export const POSTS_RECOMMEND_MANGA = "POSTS_RECOMMEND_MANGA"

//History
export const ADD_HISTORY_MANGA = "ADD_HISTORY_MANGA"
export const ADD_HISTORY_CHAPTER = "ADD_HISTORY_CHAPTER"

//Bookmark
export const ADD_BOOKMARK_MANGA = "ADD_BOOKMARK_MANGA"


interface Data {
    author: string
    genre: Array<any>
    image: string
    rating: any
    release: string
    sinopsis: string
    status: string
    title: string
    total: any
}

interface ChapterHistory {
    [key: string]: boolean
}

interface Bookmark {
    [key: string]: boolean
}

interface History {
    Home?: any
    List?: any
    Recommend: any
    History: {
        [key: string]: {
            data: Data,
            item: Array<any>
        }
    }
    ChapterHistory?: ChapterHistory,
    Bookmark?: Bookmark
}


const store: History = {
    Home: [],
    List: [],
    Recommend: [],
    History: {},
    ChapterHistory: {},
    Bookmark: {}
}

export const manga = (state = store, actions) => {
    switch (actions.type) {
        case POSTS_HOME_MANGA:
            return {
                ...state,
                Home: actions.payload
            };
        case POSTS_LIST_MANGA:
            const data = [...state.List, ...actions.payload]
            return {
                ...state,
                List: data
            }
        case POSTS_RECOMMEND_MANGA:
            return {
                ...state,
                Recommend: actions.payload
            }
        //History
        case ADD_HISTORY_MANGA:
            //@ts-ignore
            let data_history = {
                ...state.History,
                [`${actions.payload.id}`]: {
                    data: actions.payload.data,
                    item: actions.payload.item
                }
            }
            return {
                ...state,
                History: data_history
            }
        case ADD_HISTORY_CHAPTER:
            return {
                ...state,
                ChapterHistory: {
                    ...state.ChapterHistory,
                    ...actions.payload
                }
            }
        case ADD_BOOKMARK_MANGA:
            console.log({
                Bookmark: {
                    ...state.Bookmark,
                    ...actions.payload
                }
            })
            return {
                ...state,
                Bookmark: {
                    ...state.Bookmark,
                    ...actions.payload
                }
            }
        default:
            return state
    }
}