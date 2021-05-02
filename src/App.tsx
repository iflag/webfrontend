import MainPage from "pages/main-page/main-page";
import React, { useEffect } from "react";
import "App.scss";
import BookmarkData from "utils/bookmark-data";
import NoteData from "utils/note-data";
import TodoData from "utils/todo-data";
import { useStoreContext } from "contexts/store-context";
import { observer } from "mobx-react";

const bookmarkData = new BookmarkData();
const noteData = new NoteData();
const todoData = new TodoData();

const App = observer(() => {
  const { authStore } = useStoreContext();

  useEffect(() => {
    authStore.checkLoginState();
  });

  return (
    <div className="app">
      <MainPage
        bookmarkData={bookmarkData}
        noteData={noteData}
        todoData={todoData}
        authStore={authStore}
      />
    </div>
  );
});

export default App;
