import React, { useEffect, useState } from "react";
import "components/feature/main-page/note/memo-list.scss";
import NoteData from "utils/note-data";
import { AiOutlineClear } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useUserState } from "contexts/user-context";

type Props = {
  noteData: NoteData;
};

const MemoList = ({ noteData }: Props) => {
  const userState = useUserState();
  const [contents, setContents] = useState("");

  const [editing, setEditing] = useState(false);

  const refreshNoteContents = async () => {
    try {
      const response = await noteData.getNoteContents();
      if (response.status === 200) {
        setContents(response.data.contents);
      }
    } catch (error) {
      setContents("");
    }
  };

  useEffect(() => {
    refreshNoteContents();
  }, []);

  useEffect(() => {
    refreshNoteContents();
  }, [userState.onLogin]);

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
              noteData.deleteAllContents();
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
              // onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              //   if (e.key === "Enter" || e.key === "Escape") {
              //     setEditing(false);
              //     noteData.editNote(contents);
              //     refreshNoteContents();
              //     e.preventDefault();
              //     e.stopPropagation();
              //   }
              // }}
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
};

export default MemoList;
