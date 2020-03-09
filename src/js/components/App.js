import React from 'react';
import { useSelector } from 'react-redux';

import Todos from './Todos';
import List from './List';
import Form from './Form';
import Post from './Posts';
import { Comments } from './Comments';
import './App.css';

const App = () => {
    const error = useSelector(state => {
        if (state.badWords.length > 0) {
            return state.badWords.join(',');
        } else {
            return false;
        }
    });

    return (
        <>
            <div className="todos container">
                <h2>Todos</h2>
                <Todos />
            </div>
            <div className="articles container">
                <h2>Articles</h2>
                <List />
            </div>
            <div className="new-article container">
                <h2>Add a new article</h2>
                {error && <p className="error">You used a bad word: <em>{error}</em></p>}
                <Form />
            </div>
            <div className="posts container">
                <h2>API Posts</h2>
                <Post />
            </div>
            <div className="comments container">
                <h3>Comments</h3>
                <Comments />
            </div>
        </>
    );
};

export default App;