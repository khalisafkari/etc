import {createStore,combineReducers} from 'redux'
import { anime } from './anime';
import { manga } from './manga';
import { novel } from './novel';
import { accounts } from './accouts';

const store = combineReducers({
    anime:anime,
    manga:manga,
    novel:novel,
    accounts:accounts
})

export default createStore(
    store,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());