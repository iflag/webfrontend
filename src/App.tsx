import MainPage from "pages/main-page/main-page";
import React, { useEffect } from "react";
import "App.scss";
import { useUserDispatch, useUserState } from "contexts/user-context";
import UserData from "utils/user-data";
import BookmarkData from "utils/bookmark-data";
import NoteData from "utils/note-data";
import AuthService from "utils/auth-service";

function App() {
  const userData = new UserData();
  const bookmarkData = new BookmarkData();
  const noteData = new NoteData();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    if (userData.onLogin()) {
      userDispatch({ type: "LOGIN" });
    } else {
      userDispatch({ type: "LOGOUT" });
    }
  }, []);

  return (
    <div className="app">
      <MainPage bookmarkData={bookmarkData} noteData={noteData} />
    </div>
  );
}

export default App;
