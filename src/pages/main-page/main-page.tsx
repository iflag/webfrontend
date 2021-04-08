import Bookmark from "components/feature/main-page/bookmark/bookmark";
import Note from "components/feature/main-page/note/note";
import Layout from "components/Layout";
import "pages/main-page/main-page.scss";
import React from "react";
import BookmarkData from "utils/bookmark-data";
import NoteData from "utils/note-data";

type Props = {
  bookmarkData: BookmarkData;
  noteData: NoteData;
};

const MainPage = ({ bookmarkData, noteData }: Props) => {
  return (
    <Layout>
      <div className="mainpage">
        <Bookmark bookmarkData={bookmarkData} />
        <Note noteData={noteData} />
      </div>
    </Layout>
  );
};

export default MainPage;
