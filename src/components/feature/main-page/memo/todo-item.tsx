import React, { useEffect, useState } from "react";
import "components/feature/main-page/memo/todo-item.scss";
import { AiOutlineClose } from "react-icons/ai";
import { Todo } from "components/feature/main-page/memo/todo-list";
import TodoData from "utils/todo-data";
import { observer } from "mobx-react";
type Props = {
  todo: Todo;
  todoData: TodoData;
  refreshTodos: () => Promise<void>;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoItem = observer(
  ({ todo, todoData, refreshTodos, editing, setEditing }: Props) => {
    const [checked, setChecked] = useState<boolean | undefined>(false);

    const [contents, setContents] = useState(todo.contents);

    useEffect(() => {
      setChecked(todo.completed);
    }, []);

    const handleClickDeleteButton = async () => {
      await todoData.deleteTodo(todo.id);
      refreshTodos();
    };

    const handleChangeChecked = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setChecked(e.target.checked);
      await todoData.completeTodo(todo.id);
    };

    const handleSubmitEditTodo = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      await todoData.updateTodo(todo.id, contents);
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
  }
);

export default TodoItem;
