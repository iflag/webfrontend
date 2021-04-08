import React from "react";
import "components/feature/main-page/note/note.scss";
import MemoList from "components/feature/main-page/note/memo-list";
import TodoList from "components/feature/main-page/note/todo-list";

const Note = () => {
  return (
    <div className="note">
      <MemoList />
      <TodoList />
    </div>
  );
};

export default Note;
