// src/components/EditTodoPage.js

  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useParams, useNavigate, Link } from 'react-router-dom'; // useParams برای گرفتن id از URL

  function EditTodoPage() {
    const { id } = useParams(); // id رو از URL میگیریم (مثلا /edit/123 -> id = 123)
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
      const fetchTodo = async () => {
        try {
          const response = await axios.get(`https://amiable-nurturing-production.up.railway.app/api/todos/${id}/`);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        } catch (error) {
          console.error("There was an error fetching the todo for editing!", error);
          navigate('/'); // اگر Todo پیدا نشد، برگرد به صفحه اصلی
        }
      };
      fetchTodo();
    }, [id, navigate]); // وقتی id یا navigate تغییر کرد، این useEffect دوباره اجرا میشه

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`https://amiable-nurturing-production.up.railway.app/api/todos/${id}/`, {
          title,
          description,
          completed,
        });
        navigate('/'); // بعد از ویرایش، کاربر رو به صفحه لیست Todoها هدایت کن
      } catch (error) {
        console.error("There was an error updating the todo!", error);
      }
    };

    return (
      <div>
        <h2>Edit Todo</h2>
        <Link to="/">Back to Todo List</Link> {/* دکمه بازگشت */}
        <form onSubmit={handleSubmit} className="add-todo-form"> {/* از همان استایل‌ها استفاده میکنیم */}
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
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
          </label>
          <button type="submit">Update Todo</button>
        </form>
      </div>
    );
  }

  export default EditTodoPage;