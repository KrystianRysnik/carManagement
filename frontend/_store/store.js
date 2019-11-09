import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../_reducers';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

store.subscribe(() => {
    console.log('🔥 Store updated')
    console.log(store.getState())
})

export default store;