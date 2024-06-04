import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import EducationalPlatform from './pages/EducationalPlatform/EducationalPlatform.jsx';
import Count from './pages/Count.jsx';
import Price from './pages/Price.jsx';
import SellingPlatform from './pages/SellingPlatform.jsx';
import User from './pages/User.jsx';
import Soil from './pages/EducationalPlatform/soil/Soil.jsx';
import Quiz from './pages/EducationalPlatform/quiz/quiz.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Count />} />
          <Route path="/Fruit-Couting" element={<Count />} />
          <Route path="/Price-Prediction" element={<Price />} />
          <Route path="/Selling-Platform" element={<SellingPlatform/>} />
          <Route path="/Educational-Platform" element={<EducationalPlatform />} />
          <Route path="/Educational-Platform/Soil" element={<Soil/>} />
          <Route path="/Educational-Platform/quiz" element={<Quiz/>} />
          
          <Route path="/User" element={<User />} />
          
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;