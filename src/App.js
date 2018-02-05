import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm} from './components/TodoForm';
import {TodoList} from './components/TodoList';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './lib/todoHelpers'

class App extends Component {

	constructor() {
		super();
		// set initial state- an array with multiple todo objects
		this.state = {
			todos: [
				{id: 1, name: 'Learn JSX', isComplete: false},
                {id: 2, name: 'Build an Awesome App', isComplete: false},
                {id: 3, name: 'Ship It', isComplete: false}
			],
			currentTodo: ""
		}
		// bind methods
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmptySubmit = this.handleEmptySubmit.bind(this);
	}

	handleRemove = (id) => {
		
		const updatedTodos = removeTodo(this.state.todos, id)
		this.setState({todos: updatedTodos})
	}

	handleToggle = (id) => {
		const todo = findById(id, this.state.todos)
		const toggled = toggleTodo(todo)
		const updatedTodos = updateTodo(this.state.todos, toggled)
		this.setState({todos: updatedTodos})
	}

	handleSubmit(e) {
		// prevent the form from submitting through a get and refreshing the page
		e.preventDefault(); 
		const newId = generateId()
		const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
		const updatedTodos = addTodo(this.state.todos, newTodo);
		this.setState({
			todos: updatedTodos,
			currentTodo: '',
			errorMessage: ''
		})
	}

	handleEmptySubmit(e) {
		e.preventDefault()
		this.setState({
			errorMessage: 'Please supply the todo name'
		})
	}

	handleInputChange(e) {
		this.setState({
			currentTodo: e.target.value
		})
	}
  render() {
	const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>To Do React App</h2>
        </div>
		<div className="todo-app">
			{this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
			<TodoForm handleInputChange={this.handleInputChange} currentTodo={this.state.currentTodo} handleSubmit={submitHandler} />
			<TodoList handleToggle={this.handleToggle} todos={this.state.todos}
			handleRemove={this.handleRemove}/>
        </div>
      </div>
    );
  }
}

export default App;
