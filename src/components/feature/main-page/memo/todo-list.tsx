import React, { useState, useEffect } from "react";
import "components/feature/main-page/memo/todo-list.scss";
import TodoItem from "./todo-item";
import TodoData from "utils/todo-data";

type Props = {
  todoData: TodoData;
};

export type Todo = {
  completed: boolean;
  contents: string;
  id: number;
};

const TodoList = ({ todoData }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [contents, setContents] = useState("");

  useEffect(() => {
    todoData.getAllTodoList().then((response) => {
      if (response.status === 200) {
        setTodos(response.data.todos);
      }
    });
  }, []);

  return (
    <div className="todoList">
      <div className="todoList-header">
        <p className="todoList-title">Todo</p>
        <button className="todoList-addButton">
          <figure className="todoList-buttonImage" />
        </button>
      </div>
      <form
        className="todoList-addTodo"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (contents === "") return;

          todoData.addTodo(contents).then((response) => {
            if (response.status === 200) {
            }
          });
        }}
      >
        <input
          className="todoList-addContent"
          value={contents}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setContents(e.target.value);
          }}
          placeholder="새로운 할 일을 추가하세요!"
        />
        <button type="submit" className="todoList-addButton">
          add
        </button>
      </form>
      <div className="todoList-main">
        {todos &&
          todos.map(
            (
              todo: Todo
            ): React.DetailedHTMLProps<
              React.HTMLAttributes<HTMLParagraphElement>,
              HTMLParagraphElement
            > => <TodoItem key={todo.id} todo={todo} todoData={todoData} />
          )}
      </div>
    </div>
  );
};

export default TodoList;
