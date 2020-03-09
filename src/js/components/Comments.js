import React, { useEffect, useState, createRef } from 'react';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { getData } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { COMMENTS_LOADED } from '../constants/action-types';
import './comments.css'
//
export const Comments = ({ id }) => {
    const [showPerPage, setShowPerPage] = useState(10);
    const [startOffset, setStartOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(10);
    const [inProp, setInProp] = useState(false);
    const selectRef = createRef();

    const duration = 300;
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0
    };
    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 }
    };

    const url = id ?
        `https://jsonplaceholder.typicode.com/posts/${id}/comments` :
        `https://jsonplaceholder.typicode.com/comments`;
    const dispatch = useDispatch();
    const comments = useSelector(state => {
        if (state.comments.length > 0) {
            return state.comments.slice(startOffset, endOffset);
        }
        else {
            return [];
        }
    });

    useEffect(() => {
        console.log(url);
        dispatch(getData(url, COMMENTS_LOADED));
    }, [url, dispatch]);

    useEffect(() => {
        if (comments.length > 0) {
            setInProp(true);
        }
    }, [comments]);

    const prevPage = () => {
        setStartOffset(Math.max(0, startOffset - showPerPage));
        setEndOffset(Math.max(showPerPage, startOffset - showPerPage));
    };

    const nextPage = () => {
        setStartOffset(startOffset + showPerPage);
        setEndOffset(endOffset + showPerPage);
    };

    function updateShowPerPage() {
        const count = parseInt(selectRef.current.value);
        setStartOffset(0);
        setEndOffset(count);
        setShowPerPage(count);
    };

    return (
        <>
            <CSSTransition
                in={inProp}
                timeout={200}
                classNames="example"
                mountOnEnter={true} appear>
                <div className="pagination">
                    <span>Page {startOffset} / {endOffset}</span>
                    <button onClick={() => prevPage()}>Prev</button>
                    <select onChange={updateShowPerPage} ref={selectRef}>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    <button onClick={() => nextPage()}>Next</button>
                </div>
            </CSSTransition>
            <Transition
                in={inProp}
                timeout={duration} appear>
                {state => (
                    <p style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>These are comments from {url}</p>
                )}
            </Transition>
            <TransitionGroup className="comment-list" component="ol">
                {comments.map(el => (
                    <CSSTransition
                        key={el.id}
                        timeout={500}
                        classNames="item">
                        <li key={el.id} className="comment-item">
                            <h4>{el.name}</h4>
                            <h5>{el.email}</h5>
                            <p>{el.body}</p>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </>
    );
};