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
      const response = await noteData.getNoteContents();
      if (response.status === 200) {
        setContents(response.data.contents);
      }
      authStore.refreshToken();
    } catch (error) {
      alert(error.request.response);
      setContents("");
    }
  };

  useEffect(() => {
    refreshNoteContents();
  }, [authStore.onLogin]);

  return (
    <div className="memoList">
      <div className="memoList-header">
        <p className="memoList-title">Memo</p>
        <div className="memoList-buttons">
          <button
            className="memoList-edit"
            onClick={() => {
              setEditing((prev) => !prev);
            }}
          >
            <BiEdit />
          </button>
          <button
            className="memoList-clear"
            onClick={() => {
              noteData.deleteAllNote();
              refreshNoteContents();
            }}
          >
            <AiOutlineClear />
          </button>
        </div>
      </div>
      <div className="memoList-main">
        {!editing ? (
          <p className="memoList-contents" onClick={() => setEditing(true)}>
            {contents}
          </p>
        ) : (
          <div className="memoList-setting">
            <textarea
              value={contents}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setContents(e.target.value);
              }}
              className="memoList-input"
            />
            <button
              className="memoList-save"
              onClick={() => {
                setEditing(false);
                noteData.editNote(contents).then(() => {
                  refreshNoteContents();
                });
              }}
            >
              save
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default Note;
