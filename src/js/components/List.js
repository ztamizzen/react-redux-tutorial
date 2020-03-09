import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './list.css';

const List = () => {
    const articles = useSelector(state => {
        return state.articles;
    });
    return (
        <TransitionGroup className="article-list" component="ul">
            {articles.map((el, index) => (
                <CSSTransition key={index} timeout={500} classNames="article">
                    <li className="article-item" key={index}>
                        <h3>{el.title}</h3>
                        <p>{el.body}</p>
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};
export default List;
