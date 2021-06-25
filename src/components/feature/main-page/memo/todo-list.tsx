import React, { useState, useEffect } from "react";
import "components/feature/main-page/memo/todo-list.scss";
import TodoItem from "./todo-item";
import TodoData from "utils/todo-data";
import AuthStore from "stores/auth-store";
import { observer } from "mobx-react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";

type Props = {
  todoData: TodoData;
  authStore: AuthStore;
};

export type Todo = {
  completed: boolean;
  contents: string;
  id: number;
};

const TodoList = observer(({ todoData, authStore }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [contents, setContents] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    refreshTodos();
  }, [authStore.onLogin]);

  const refreshTodos = async () => {
    if (!authStore.onLogin) {
      setTodos([]);
      return;
    }

    try {
      const result = await todoData.getAllTodoList();
      setTodos(result.todos);
    } catch (error) {
      alert(error.request.response);
    }
  };

  const handleSubmitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contents === "") return;

    try {
      await todoData.addTodo(contents);
      refreshTodos();
      setContents("");
    } catch (error) {
      alert(error.request.response);
    }

    authStore.refreshToken();
  };

  return (
    <div className="todoList">
      <div className="todoList-header">
        <p className="todoList-title">Todo</p>
        <div className="todoList-buttonList">
          <button
            className="todoList-showAddForm"
            onClick={() => setShowAddForm((prev) => !prev)}
          >
            {showAddForm ? <AiFillMinusCircle /> : <AiFillPlusCircle />}
          </button>
          <button
            className="todoList-editButton"
            onClick={() => setEditing((prev) => !prev)}
          >
            <IoMdSettings />
          </button>
        </div>
      </div>
      {showAddForm && (
        <form
          className="todoList-addTodo"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSubmitTodo(e)
          }
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
      )}
      <ul className="todoList-main">
        {todos &&
          todos.map(
            (
              todo: Todo
            ): React.DetailedHTMLProps<
              React.HTMLAttributes<HTMLParagraphElement>,
              HTMLParagraphElement
            > => (
              <TodoItem
                key={todo.id}
                todo={todo}
                todoData={todoData}
                refreshTodos={refreshTodos}
                editing={editing}
                setEditing={setEditing}
              />
            )
          )}
      </ul>
    </div>
  );
});

export default TodoList;
