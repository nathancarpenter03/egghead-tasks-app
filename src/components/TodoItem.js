import React from 'react';
// stateless functional component - a function that takes props and returns some jsx
export const TodoItem = (props) => {
    // const handleRemove = partial(props.handleRemove, props.id);
    return (
        <li>
        <span className="delete-item"><a href="#" onClick={() => props.handleRemove(props.id)}>X</a></span>
        <input type="checkbox" onChange={() => props.handleToggle(props.id)} checked={props.isComplete}/> {props.name}
		</li>
    )
}

// validate component input with prop types 
// TodoItem.propTypes = {
//     name: React.PropTypes.string.isRequired,
//     isComplete: React.PropTypes.bool,
//     id: React.PropTypes.number.isRequired
// }