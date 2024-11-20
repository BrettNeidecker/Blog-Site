import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlog from './pages/UserBlog';
import Home from './pages/Home'; // Import Home component
import Dashboard from './pages/Dashboard'; // Import Dashboard component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Updated */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blogs/:username" element={<UserBlog />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* New route */}
            </Routes>
        </Router>
    );
}

export default App;
