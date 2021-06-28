import React, { memo, useEffect, useState } from "react";
import "components/feature/main-page/memo/todo-item.scss";
import { AiOutlineClose } from "react-icons/ai";
import { Todo } from "components/feature/main-page/memo/todo-list";
import { observer } from "mobx-react";
import TodoStore from "stores/todo-store";
type Props = {
  todo: Todo;
  todoStore: TodoStore;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoItem = observer(({ todo, todoStore, editing, setEditing }: Props) => {
  const [checked, setChecked] = useState<boolean | undefined>(false);

  const [contents, setContents] = useState("");

  useEffect(() => {
    setChecked(todo.completed);
    setContents(todo.contents);
  }, []);

  const handleClickDeleteButton = () => {
    todoStore.deleteTodo(todo.id);
  };

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    todoStore.completeTodo(todo.id);
  };

  const handleSubmitEditTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todoStore.editTodo(todo.id, contents);
    setEditing(false);
  };

  return (
    <li className="todoItem">
      {!editing ? (
        <>
          <p
            className={`todoItem-contents ${checked && "checked"}`}
            onContextMenu={(
              e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
            ) => {
              e.preventDefault();
              setEditing(true);
            }}
          >
            {contents}
          </p>
          <input
            type="checkbox"
            className="todoItem-checkbox"
            checked={checked}
            onChange={handleChangeChecked}
          />
        </>
      ) : (
        <form className="todoItem-editForm" onSubmit={handleSubmitEditTodo}>
          <button
            className="todoItem-deleteButton"
            type="button"
            onClick={handleClickDeleteButton}
          >
            <AiOutlineClose />
          </button>
          <input
            className="todoItem-editForm-input"
            value={contents}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setContents(e.target.value);
            }}
          />
          <button className="todoItem-editForm-button" type="submit">
            edit
          </button>
        </form>
      )}
    </li>
  );
});

export default memo(TodoItem);
