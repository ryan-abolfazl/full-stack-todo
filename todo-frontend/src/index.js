// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // این فایل رو بعدا برای استایل‌دهی استفاده میکنیم
import App from './App'; // کامپوننت اصلی App رو ایمپورت میکنیم

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);