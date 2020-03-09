import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addArticle, resetBadWords } from '../actions/index';
import './Form.css';

class ConnectedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { title, body } = this.state;
        this.props.addArticle({
            title,
            body
        });
        this.setState({
            title: ''
        });
    }
    render() {
        const { title, body } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="article-form">
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        placeholder="Write title"
                        type="text"
                        id="title"
                        value={title}
                        onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <textarea
                        placeholder="Write the post body..."
                        id="body"
                        value={body}
                        onChange={this.handleChange}
                    ></textarea>
                    {/* <input
                        placeholder="Write title"
                        type="text"
                        id="title"
                        value={title}
                        onChange={this.handleChange} /> */}
                </div>
                <button type="submit">Save</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addArticle: article => {
            // Order is important
            dispatch(resetBadWords());
            dispatch(addArticle(article));
        }
    };
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;
