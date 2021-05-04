import React, { useEffect, useState } from "react";
import "components/feature/main-page/memo/todo-item.scss";
import { Todo } from "components/feature/main-page/memo/todo-list";
import TodoData from "utils/todo-data";
import { observer } from "mobx-react";
type Props = {
  todo: Todo;
  todoData: TodoData;
};

const TodoItem = observer(({ todo, todoData }: Props) => {
  const [checked, setChecked] = useState<boolean | undefined>(false);
  const [editing, setEditing] = useState(false);
  const [contents, setContents] = useState(todo.contents);

  useEffect(() => {
    setChecked(todo.completed);
  }, []);

  const handleChangeChecked = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(e.target.checked);
    await todoData.completeTodo(todo.id);
  };

  const handleSubmitEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await todoData.updateTodo(todo.id, contents);
    setEditing(false);
  };

  return (
    <li className="todoItem">
      {!editing ? (
        <>
          <p
            className="todoItem-contents"
            onDoubleClick={() => {
              setEditing(true);
            }}
          >
            {contents}
          </p>
          <input
            type="checkbox"
            className="todoItem-checkbox"
            checked={checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeChecked(e)
            }
          />
        </>
      ) : (
        <form
          className="todoItem-editForm"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSubmitEditTodo(e)
          }
        >
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

export default TodoItem;
