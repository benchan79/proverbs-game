import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProverbsGame from "./ProverbsGame"

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/proverbs-game" element={<ProverbsGame />} />
        </Routes>
      </main>
    </BrowserRouter>

  );
}

export default App;
