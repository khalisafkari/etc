import {createStore,combineReducers} from 'redux'
import { anime } from './anime';
import { manga } from './manga';
import { novel } from './novel';

const store = combineReducers({
    anime:anime,
    manga:manga,
    novel:novel
})

export default createStore(
    store,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());