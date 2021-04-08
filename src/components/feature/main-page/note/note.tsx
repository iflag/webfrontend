import React from "react";
import "components/feature/main-page/note/note.scss";
import MemoList from "components/feature/main-page/note/memo-list";
import TodoList from "components/feature/main-page/note/todo-list";
import NoteData from "utils/note-data";

type Props = {
  noteData: NoteData;
};

const Note = ({ noteData }: Props) => {
  return (
    <div className="note">
      <MemoList noteData={noteData} />
    </div>
  );
};

export default Note;
