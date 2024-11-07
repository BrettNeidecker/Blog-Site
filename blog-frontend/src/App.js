import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlog from './pages/UserBlog';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Welcome to blog-site</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blogs/:username" element={<UserBlog />} />
            </Routes>
        </Router>
    );
}

export default App;
