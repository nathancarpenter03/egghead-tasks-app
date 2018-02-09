import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm} from './components/TodoForm';
import {TodoList} from './components/TodoList';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers';
import {Footer} from './components/Footer';
import PropTypes from 'prop-types'; 
import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/todoService';

class App extends Component {

	constructor() {
		super();
		// set initial state- an array with multiple todo objects
		this.state = {
			todos: [],
			currentTodo: ""
		}
		// bind methods
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmptySubmit = this.handleEmptySubmit.bind(this);
	}

	static contextTypes = {
		route: PropTypes.string
	}

	componentDidMount() {
		loadTodos()
			.then(todos => this.setState({todos}))
	}
	handleRemove = (id) => {
		const updatedTodos = removeTodo(this.state.todos, id)
		this.setState({todos: updatedTodos})
		destroyTodo(id)
			.then(() => this.showTempMessage('Task Removed'))
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
		createTodo(newTodo)
			.then(() => this.showTempMessage('Todo Added'))
	}

	showTempMessage = (msg) => {
		this.setState({message: msg})
		setTimeout(() => this.setState({message: ''}), 2500)
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
	const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>To Do React App</h2>
        </div>
		<div className="todo-app">
			{this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
			{this.state.message && <span className="success">{this.state.message}</span>}
			<TodoForm handleInputChange={this.handleInputChange} currentTodo={this.state.currentTodo} handleSubmit={submitHandler} />
			<TodoList handleToggle={this.handleToggle} todos={displayTodos}
			handleRemove={this.handleRemove}/>
			<Footer />
        </div>
      </div>
    );
  }
}

export default App;
