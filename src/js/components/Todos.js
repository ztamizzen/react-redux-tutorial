import React from 'react';
import { toggleTodo } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

const Todos = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => {
        return state.todos;
    });
    const completed = (id) => {
        dispatch(toggleTodo(id));
    };
    return (
        <>
            <ul className="todos-list">
                {todos.map((todo, index) => (
                    <li className="todo-item" key={index}>
                        <label>
                            <input type="checkbox" onChange={() => completed(index)} checked={todo.completed} />
                            <span className="text">{todo.text}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Todos;