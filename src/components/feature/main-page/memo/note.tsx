import React, { useEffect, useState } from "react";
import "components/feature/main-page/memo/note.scss";
import NoteData from "utils/note-data";
import { AiOutlineClear } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import AuthStore from "stores/auth-store";
import { observer } from "mobx-react";

type Props = {
  noteData: NoteData;
  authStore: AuthStore;
};

const Note = observer(({ noteData, authStore }: Props) => {
  const [contents, setContents] = useState("");

  const [editing, setEditing] = useState(false);

  const refreshNoteContents = async () => {
    if (!authStore.onLogin) {
      setContents("");
      return;
    }
    try {
      const result = await noteData.getNoteContents();
      setContents(result.contents);
      authStore.refreshToken();
    } catch (error) {
      alert(error.request.response);
      setContents("");
    }
  };

  const handleKeyPressEditButton = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        try {
          await noteData.editNote(contents);
          refreshNoteContents();
          setEditing(false);
        } catch (error) {
          alert(error.request.response);
        }
      }
    }
  };

  useEffect(() => {
    refreshNoteContents();
  }, [authStore.onLogin]);

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
              noteData.deleteAllNote();
              refreshNoteContents();
            }}
          >
            <AiOutlineClear />
          </button>
        </div>
      </div>
      <div className="note-main">
        {!editing ? (
          <p className="note-contents" onClick={() => setEditing(true)}>
            {contents}
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
