// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SecuredComponent from './components/SecuredComponent';
import Home from './pages/Home';
import WhiteboardSession from './pages/WhiteboardSession';
import Whiteboard from './pages/Whiteboard';

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard" element={<WhiteboardSession />} />
        <Route path="/board" element={<Whiteboard />} />
        <Route path="/secured" element={<SecuredComponent></SecuredComponent>} />
      </Routes>

    </BrowserRouter>
  );
};

export default App;
