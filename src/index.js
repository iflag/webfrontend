import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import "index.css";
import { UserContextProvider } from "contexts/user-context";
import { DragDropContext } from "react-beautiful-dnd";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <DragDropContext>
        <App />
      </DragDropContext>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
