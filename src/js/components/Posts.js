import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getData } from '../actions';
import { DATA_LOADED } from '../constants/action-types';
import { Comments } from './Comments';
import './Posts.css';

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadComments: false,
            post: -1
        };
    }
    async componentDidMount() {
        await this.props.getData(
            'https://jsonplaceholder.typicode.com/posts',
            DATA_LOADED
        );
    }
    loadComments(id) {
        this.setState({
            loadComments: true,
            post: id
        });
    };

    render() {
        const { loadComments, post } = this.state;
        return (
            <>
                <TransitionGroup className="post-list" component="ul">
                    {this.props.articles.map(el => (
                        <CSSTransition
                            in={true}
                            key={el.id}
                            timeout={200}
                            classNames="example"
                            mountOnEnter={true} appear>
                            <li key={el.id} className="post-item">
                                <h3>{el.title}</h3>
                                <p>{el.body}</p>
                                <button onClick={() => this.loadComments(el.id)}>Comments</button>
                                {loadComments && post === el.id &&
                                    <Comments id={el.id} />
                                }
                            </li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        articles: state.remoteArticles.slice(0, 10)
    };
}

export default connect(
    mapStateToProps,
    { getData }
)(Post);
