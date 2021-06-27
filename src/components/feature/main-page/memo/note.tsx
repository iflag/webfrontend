import React, { useEffect, useState } from "react";
import "components/feature/main-page/memo/note.scss";
import { AiOutlineClear } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import AuthStore from "stores/auth-store";
import { observer } from "mobx-react";
import { useStoreContext } from "contexts/store-context";

type Props = {
  authStore: AuthStore;
};

const Note = observer(({ authStore }: Props) => {
  const { noteStore } = useStoreContext();
  const [contents, setContents] = useState("");

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    noteStore.refreshNoteContents();

    setContents(noteStore.note);
  }, [authStore.onLogin, editing]);

  const handleKeyPressEditButton = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        try {
          noteStore.editNoteContents(contents);
          setEditing(false);
        } catch (error) {
          alert(error.request.response);
        }
      }
    }
  };

  return (
    <div className="note">
      <div className="note-header">
        <p className="note-title">Memo</p>
        <div className="note-buttons">
          <button
            className="note-edit"
            onClick={() => {
              setEditing((prev) => !prev);
            }}
          >
            <BiEdit />
          </button>
          <button
            className="note-clear"
            onClick={() => {
              noteStore.deleteNoteContents();
            }}
          >
            <AiOutlineClear />
          </button>
        </div>
      </div>
      <div className="note-main">
        {!editing ? (
          <p className="note-contents" onClick={() => setEditing(true)}>
            {noteStore.note}
          </p>
        ) : (
          <div className="note-setting">
            <textarea
              value={contents}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setContents(e.target.value);
              }}
              className="note-input"
              onKeyPress={handleKeyPressEditButton}
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default Note;
