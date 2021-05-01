import Bookmark from "components/feature/main-page/bookmark/bookmark";
import MemoList from "components/feature/main-page/memo/note";
import TodoList from "components/feature/main-page/memo/todo-list";
import Layout from "components/Layout";
import "pages/main-page/main-page.scss";
import React from "react";
import AuthService from "utils/auth-service";
import BookmarkData from "utils/bookmark-data";
import NoteData from "utils/note-data";
import TodoData from "utils/todo-data";

type Props = {
  bookmarkData: BookmarkData;
  noteData: NoteData;
  todoData: TodoData;
  authService: AuthService;
};

const MainPage = ({ bookmarkData, noteData, todoData, authService }: Props) => {
  return (
    <Layout>
      <div className="mainpage">
        <TodoList todoData={todoData} />
        <Bookmark bookmarkData={bookmarkData} />
        <MemoList noteData={noteData} authService={authService} />
      </div>
    </Layout>
  );
};

export default MainPage;
