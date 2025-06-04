// src/components/TodoListPage.js

  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { Link } from 'react-router-dom'; // برای لینک دادن به صفحات دیگه

  function TodoListPage() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      fetchTodos();
    }, []);

    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/todos/');
        if (response.data && Array.isArray(response.data.results)) {
          setTodos(response.data.results);
        } else if (response.data && Array.isArray(response.data)) {
          setTodos(response.data);
        } else {
          setTodos([]);
          console.warn("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the todos!", error);
        setTodos([]);
      }
    };

    const toggleComplete = async (id, currentCompleted) => {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, {
          title: todoToUpdate.title,
          description: todoToUpdate.description,
          completed: !currentCompleted,
        });
        setTodos(todos.map(todo =>
          todo.id === id ? response.data : todo
        ));
      } catch (error) {
        console.error("There was an error updating the todo!", error);
      }
    };

    const deleteTodo = async (id) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
        setTodos(todos.filter(todo => todo.id !== id));
      } catch (error) {
        console.error("There was an error deleting the todo!", error);
      }
    };

    return (
      <div>
        <h2>Your Todos</h2>
        <Link to="/add">Add New Todo</Link> {/* دکمه اضافه کردن */}
        <div className="todo-list">
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <div className="todo-actions">
                  <button onClick={() => toggleComplete(todo.id, todo.completed)}>
                    {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                  </button>
                  <Link to={`/edit/${todo.id}`}> {/* دکمه ویرایش */}
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No todos yet! Add one above.</p>
          )}
        </div>
      </div>
    );
  }

  export default TodoListPage;