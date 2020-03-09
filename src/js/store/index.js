import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import rootReducer from '../reducers';
import { forbiddenWordsMiddleware } from '../middleware';
import { VisibilityFilters } from '../constants/action-types';
import apiSaga from '../sagas/api-saga';

const { SHOW_ALL } = VisibilityFilters;
const initialiseSagaMiddleware = createSagaMiddleWare();

const initialState = {
    album: {},
    albums: [],
    articles: [],
    badWords: [],
    comments: [],
    counter: {
        count: 0
    },
    pagination: {
        current: 0,
        perPage: 10
    },
    photos: [],
    remoteArticles: [],
    todos: [
        {
            text: 'Consider using Redux',
            completed: true
        },
        {
            text: 'Keep all state in a single tree',
            completed: false
        }
    ],
    visibilityFilter: SHOW_ALL
};

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    storeEnhancers(
        applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware)
    )
);
initialiseSagaMiddleware.run(apiSaga);

export default store;