import Bookmarks from "components/feature/main-page/bookmark/bookmarks";
import Note from "components/feature/main-page/memo/note";
import TodoList from "components/feature/main-page/memo/todo-list";
import Layout from "components/Layout";
import { observer } from "mobx-react";
import "pages/main-page/main-page.scss";
import React from "react";
import AuthStore from "stores/auth-store";
import BookmarkData from "utils/bookmark-data";
import NoteData from "utils/note-data";
import TodoData from "utils/todo-data";

type Props = {
  bookmarkData: BookmarkData;
  noteData: NoteData;
  todoData: TodoData;
  authStore: AuthStore;
};

const MainPage = observer(
  ({ bookmarkData, noteData, todoData, authStore }: Props) => {
    return (
      <Layout>
        <div className="mainpage">
          <TodoList todoData={todoData} authStore={authStore} />
          <Bookmarks bookmarkData={bookmarkData} authStore={authStore} />
          <Note noteData={noteData} authStore={authStore} />
        </div>
      </Layout>
    );
  }
);

export default MainPage;
