import React, { Component } from 'react';
// stateless functional component - a function that takes props and returns some jsx
export const TodoForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text" 
            onChange={props.handleInputChange} 
            value={props.currentTodo}/>
    </form>
)

// validate component input with prop types 
// TodoForm.propTypes = {
//     currentTodo: React.PropTypes.string.isRequired,
//     handleInputChange: React.PropTypes.isRequired.func
// }