import React, { useState } from "react";
import "components/feature/main-page/bookmark/bookmarkList-in-folder.scss";
import { Bookmark } from "components/feature/main-page/bookmark/bookmark";
import { AiOutlineClose } from "react-icons/ai";
import BookmarkData from "utils/bookmark-data";
import BookmarkItemInFolder from "components/feature/main-page/bookmark/bookmarkItem-in-folder";

type Props = {
  bookmarkData: BookmarkData;
  bookmarksInFolder: Bookmark[];
  setShowSelectedFolder: React.Dispatch<React.SetStateAction<boolean>>;
  refreshBookmarkListInFolder: (id: number) => void;
  contentId: number;
};

function BookmarkListInFolder({
  bookmarkData,
  bookmarksInFolder,
  setShowSelectedFolder,
  refreshBookmarkListInFolder,
  contentId,
}: Props) {
  return (
    <section className="insideFolder">
      <button
        className="insideFolder-close"
        onClick={() => {
          setShowSelectedFolder(false);
        }}
      >
        <AiOutlineClose />
      </button>
      {bookmarksInFolder &&
        bookmarksInFolder.map((bookmark: Bookmark, idx: number) => (
          <BookmarkItemInFolder
            key={idx}
            bookmarkData={bookmarkData}
            bookmark={bookmark}
            refreshBookmarkListInFolder={refreshBookmarkListInFolder}
            contentId={contentId}
          />
        ))}
    </section>
  );
}

export default BookmarkListInFolder;
