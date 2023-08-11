import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import DefaultPage from './DefaultPage';
import Home from './Home';
import NumberGame from "./NumberGame"
import WordGame from "./WordGame"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<DefaultPage />} />
          <Route path="/proverbs-game" element={<Home />} />
          <Route path="/proverbs-game/number" element={<NumberGame />} />
          <Route path="/proverbs-game/word" element={<WordGame />} />
        </Routes>
      </main>
    </BrowserRouter>

  );
}

export default App;
