import React from 'react';
import {TodoItem} from './TodoItem';
// stateless functional component - a function that takes props and returns some jsx
export const TodoList = (props) => {
    return (
        <div className="todo-List">
				<ul>
                    {props.todos.map(todo => <TodoItem handleToggle={props.handleToggle} key={todo.id} {...todo} handleRemove={props.handleRemove} />)}	
                </ul>
                <div><br/><br/>
                    <span>Note: hover over an item to remove!</span>
                </div>
            </div>  
    )
}
// spread operator replaces id={todo.id} name={todo.name} etc - takes all properties of todo and pass them into component as their own individual properties

// validate component input with prop types 
// TodoList.propTypes = {
//     todos: React.PropTypes.array.isRequired
// }