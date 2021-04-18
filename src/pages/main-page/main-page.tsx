import Bookmark from "components/feature/main-page/bookmark/bookmark";
import Note from "components/feature/main-page/note/note";
import Layout from "components/Layout";
import "pages/main-page/main-page.scss";
import React from "react";
import AuthService from "utils/auth-service";
import BookmarkData from "utils/bookmark-data";
import NoteData from "utils/note-data";

type Props = {
  bookmarkData: BookmarkData;
  noteData: NoteData;
  authService: AuthService;
};

const MainPage = ({ bookmarkData, noteData, authService }: Props) => {
  return (
    <Layout>
      <div className="mainpage">
        <Bookmark bookmarkData={bookmarkData} authService={authService} />
        <Note noteData={noteData} authService={authService} />
      </div>
    </Layout>
  );
};

export default MainPage;
