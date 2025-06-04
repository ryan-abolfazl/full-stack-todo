// src/App.js

  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ایمپورت کردن React Router
  import TodoListPage from './components/TodoListPage'; // ایمپورت کامپوننت‌های جدید
  import AddTodoPage from './components/AddTodoPage';
  import EditTodoPage from './components/EditTodoPage';
  import './index.css'; // استایل‌ها همچنان اینجا هستند

  function App() {
    return (
      <Router> {/* Router کل اپلیکیشن رو در بر میگیره */}
        <div className="App">
          <h1>My Awesome Todo App</h1> {/* عنوان کلی اپلیکیشن */}
          <Routes> {/* Routes برای تعریف مسیرها */}
            <Route path="/" element={<TodoListPage />} /> {/* مسیر اصلی برای لیست Todoها */}
            <Route path="/add" element={<AddTodoPage />} /> {/* مسیر برای اضافه کردن Todo */}
            <Route path="/edit/:id" element={<EditTodoPage />} /> {/* مسیر برای ویرایش Todo (با id پویا) */}
          </Routes>
        </div>
      </Router>
    );
  }

  export default App;