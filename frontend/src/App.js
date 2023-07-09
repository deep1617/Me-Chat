// import { Button } from "@chakra-ui/react";
import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Homepage from "./pages/hompage";
import Chatpage from "./pages/chatpage";
// import app from "./".
import "./App.css"
function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact/>
      <Route path = "/chats" component = {Chatpage} exact/>
    </div>
  );
}

export default App;
