import { ADD_ARTICLE, FOUND_BAD_WORD } from "../constants/action-types";

const forbiddenWords = ["spam", "money", "gay", "gargantuan"];

export function forbiddenWordsMiddleware({ dispatch }) {
    return function (next) {
        return function (action) {
            if (action.type === ADD_ARTICLE) {
                const foundWord = forbiddenWords.filter(word =>
                    action.payload.title.includes(word)
                );
                if (foundWord.length) {
                    return dispatch({ type: FOUND_BAD_WORD, payload: foundWord });
                }
            }
            return next(action);
        };
    };
}