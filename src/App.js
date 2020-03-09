import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExampleComponent from './ExampleComponent';
import {
  INCREMENT,
  DECREMENT,
  RESET_COUNTER
} from './js/constants/action-types';

import './App.css';

function App() {
  const count = useSelector(state => state.counter.count);
  const articles = useSelector(state => state.articles.length);
  const remoteArticles = useSelector(state => state.remoteArticles.length);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://thoughtbot.com/blog/using-redux-with-react-hooks"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React, Hooks with Redux counter
        </a>
        <div>Count: {count}</div>
        <pre>C: {articles} / {remoteArticles}</pre>
        <div className="flex-row">
          <button onClick={() => dispatch({ type: DECREMENT })}>&#x2d;</button>
          <button onClick={() => dispatch({ type: RESET_COUNTER })}>reset</button>
          <button onClick={() => dispatch({ type: INCREMENT })}>&#x2b;</button>
        </div>
      </header>
      <ExampleComponent />
    </div>
  );
}

export default App;
