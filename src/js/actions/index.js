import {
    ADD_ARTICLE,
    DATA_REQUESTED,

    NEXT_PAGE,
    PREVIOUS_PAGE,

    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,

    SET_VISIBILITY_FILTER,

    BAD_WORD_RESET
} from '../constants/action-types';

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
}

export function addTodo(text) {
    return { type: ADD_TODO, text };
}

export function removeTodo(id) {
    return { type: REMOVE_TODO, id };
}

export function toggleTodo(id) {
    return { type: TOGGLE_TODO, id };
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter };
}

export function getData(url, type) {
    return { type: DATA_REQUESTED, payload: { url, type } }
}

export function resetBadWords() {
    return { type: BAD_WORD_RESET }
}

export function nextPage(current, perPage) {
    return function (dispatch) {
        dispatch({
            type: NEXT_PAGE,
            payload: {
                current,
                perPage
            }
        });
    }
}

export function previousPage(current, perPage) {
    return function (dispatch) {
        dispatch({
            type: PREVIOUS_PAGE,
            payload: {
                current,
                perPage
            }
        });
    }
}
