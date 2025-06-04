// src/components/AddTodoPage.js

  import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate, Link } from 'react-router-dom'; // useNavigate برای هدایت کاربر بعد از عملیات

  function AddTodoPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); // هوک برای هدایت کاربر

    const handleSubmit = async (e) => {
      e.preventDefault(); // از رفرش شدن صفحه جلوگیری میکنه
      try {
        await axios.post('https://amiable-nurturing-production.up.railway.app/api/todos/', {
          title, // title: title
          description, // description: description
          completed: false,
        });
        navigate('/'); // بعد از اضافه کردن، کاربر رو به صفحه لیست Todoها هدایت کن
      } catch (error) {
        console.error("There was an error adding the todo!", error);
      }
    };

    return (
      <div>
        <h2>Add New Todo</h2>
        <Link to="/">Back to Todo List</Link> {/* دکمه بازگشت */}
        <form onSubmit={handleSubmit} className="add-todo-form">
          <input
            type="text"
            placeholder="Todo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Todo Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }

  export default AddTodoPage;