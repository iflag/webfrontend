import Bookmark from "components/feature/main-page/bookmark/bookmark";
import Note from "components/feature/main-page/note/note";
import Layout from "components/Layout";
import "pages/main-page/main-page.scss";
import React from "react";
import BookmarkData from "utils/bookmark-data";

type Props = {
  bookmarkData: BookmarkData;
};

const MainPage = ({ bookmarkData }: Props) => {
  return (
    <Layout>
      <div className="mainpage">
        <Bookmark bookmarkData={bookmarkData} />
        <Note />
      </div>
    </Layout>
  );
};

export default MainPage;
