import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Search from './components/Search';
import MasterProfile from './components/MasterProfile';
import Dashboard from './components/Dashboard';
import VideoCall from './components/VideoCall';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/master/:id" element={<MasterProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/video-call/:sessionId" element={<VideoCall />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}