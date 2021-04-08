import MainPage from "pages/main-page/main-page";
import React, { useEffect } from "react";
import "App.scss";
import { useUserDispatch } from "contexts/user-context";
import UserData from "utils/user-data";
import BookmarkData from "utils/bookmark-data";

function App() {
  const userData = new UserData();
  const bookmarkData = new BookmarkData();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    if (userData.onLogin()) {
      userDispatch({ type: "LOGIN" });
    } else {
      userDispatch({ type: "LOGOUT" });
    }
  });

  return (
    <div className="app">
      <MainPage bookmarkData={bookmarkData} />
    </div>
  );
}

export default App;
