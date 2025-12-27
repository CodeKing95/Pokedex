import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Searchpokemon from "./pages/Searchpokemon";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/pokemon/:pokemon"} element={<Searchpokemon />} />
      </Routes>
    </div>
  );
};

export default App;
