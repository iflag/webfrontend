import React from "react";
import "components/feature/main-page/note/note.scss";
import MemoList from "components/feature/main-page/note/memo-list";
import TodoList from "components/feature/main-page/note/todo-list";
import NoteData from "utils/note-data";
import AuthService from "utils/auth-service";

type Props = {
  noteData: NoteData;
  authService: AuthService;
};

const Note = ({ noteData, authService }: Props) => {
  return (
    <div className="note">
      <MemoList noteData={noteData} authService={authService} />
    </div>
  );
};

export default Note;
