import { combineReducers } from 'redux';
import {
    ADD_TODO,
    TOGGLE_TODO,
    ADD_ARTICLE,
    DATA_LOADED,
    COMMENTS_LOADED,

    FOUND_BAD_WORD,
    BAD_WORD_RESET,

    INCREMENT,
    DECREMENT,
    RESET_COUNTER,

    SET_VISIBILITY_FILTER,

    VisibilityFilters,

    NEXT_PAGE,
    PREVIOUS_PAGE,

    PHOTOS_LOADED,
    ALBUM_LOADED,
    ALBUMS_LOADED
} from '../constants/action-types';

const { SHOW_ALL } = VisibilityFilters;

/* state is todos: [] */
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            });
        default:
            return state;
    }
}
/* state is articles: [] */
function articles(state = [], action) {
    switch (action.type) {
        case ADD_ARTICLE:
            if (action.payload.title !== "") {
                return [...state, action.payload];
            }
            return state;
        default:
            return state;
    }
}
/* state is visibilityFilter: CONSTANT */
function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

function counter(state = {}, action) {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + 1 };
        case DECREMENT:
            return { count: state.count - 1 };
        case RESET_COUNTER:
            return { count: 0 };
        default:
            return state;
    }
}
/* state is remoteArticles: [] */
function remoteArticles(state = {}, action) {
    switch (action.type) {
        case DATA_LOADED:
            return state.concat(action.payload);
        default:
            return state;
    }

}

function comments(state = {}, action) {
    switch (action.type) {
        case COMMENTS_LOADED:
            return state.concat(action.payload);
        default:
            return state;
    }
}

/* state is pagination: { current, perPage } */
function pagination(state = {}, action) {
    switch (action.type) {
        case NEXT_PAGE:
            return { current: state.current + 1, perPage: state.perPage };
        case PREVIOUS_PAGE:
            return { current: state.current - 1, perPage: state.perPage }
        default:
            return state;
    }
}

function badWords(state = {}, action) {
    switch (action.type) {
        case FOUND_BAD_WORD:
            return action.payload;
        case BAD_WORD_RESET:
            return [];
        default:
            return state;
    }
}

function photos(state = [], action) {
    switch (action.type) {
        case PHOTOS_LOADED:
            return action.payload;
        default:
            return state;
    }
}

function albums(state = [], action) {
    switch (action.type) {
        case ALBUMS_LOADED:
            return action.payload;
        default:
            return state;
    }
}

function album(state = [], action) {
    switch (action.type) {
        case ALBUM_LOADED:
            return action.payload;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    visibilityFilter,
    todos,
    articles,
    counter,
    remoteArticles,
    comments,
    pagination,
    badWords,
    photos,
    albums,
    album
});

export default rootReducer;
