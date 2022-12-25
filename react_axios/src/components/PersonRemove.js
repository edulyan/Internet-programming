import React from 'react';
import API from '../api';

export default class PersonRemove extends React.Component {
    state = {
        id: ''
    }

    handleChange = event => {
        this.setState({ id: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const response = await API.delete(`users/${this.state.id}`);
        console.log(response);
        console.log(response.data);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Person ID:
                        <input type="number" name="id" onChange={this.handleChange} />
                    </label>
                    <button type="submit">Delete</button>
                </form>
            </div>
        )
    }
}