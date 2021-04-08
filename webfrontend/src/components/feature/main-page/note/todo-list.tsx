import React, { useState } from "react";
import "components/feature/main-page/note/todo-list.scss";

type Todo = {
  contents: string;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      contents: "새로운 메모를 작성하세요!",
    },
  ]);
  return (
    <div className="todoList">
      <div className="todoList-header">
        <p className="todoList-title">Todo</p>
        <button className="todoList-addButton">
          <figure className="todoList-buttonImage" />
        </button>
      </div>
      <div className="todoList-main">
        {todos.map(
          (
            todo: Todo,
            idx: number
          ): React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLParagraphElement>,
            HTMLParagraphElement
          > => (
            <div key={idx} className="todoList-todoItem">
              <p className="todoList-contents">{todo.contents}</p>
              <input type="checkbox" className="todoList-checkbox" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TodoList;
