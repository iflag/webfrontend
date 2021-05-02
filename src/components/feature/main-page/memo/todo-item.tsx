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
            {todo.contents}
          </p>
          <input
            type="checkbox"
            className="todoItem-checkbox"
            checked={checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setChecked(e.target.checked);
              todoData.completeTodo(todo.id).then((response) => {});
            }}
          />
        </>
      ) : (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            todoData.updateTodo(todo.id, contents).then((response) => {
              if (response.status === 200) {
                setEditing(false);
              }
            });
          }}
        >
          <input
            value={contents}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setContents(e.target.value);
            }}
          />
        </form>
      )}
    </li>
  );
});

export default TodoItem;
