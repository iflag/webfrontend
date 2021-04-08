import React from "react";
import "components/feature/main-page/bookmark/bookmarkList-in-folder.scss";
import { Bookmark } from "components/feature/main-page/bookmark/bookmark";
import { AiOutlineClose } from "react-icons/ai";
import BookmarkData from "utils/bookmark-data";
import BookmarkItemInFolder from "components/feature/main-page/bookmark/bookmarkItem-in-folder";

type Props = {
  title: string;
  bookmarkData: BookmarkData;
  bookmarksInFolder: Bookmark[];
  setShowSelectedFolder: React.Dispatch<React.SetStateAction<boolean>>;
  refreshBookmarkListInFolder: (id: number) => void;
  contentId: number;
  getAllRootBookmarks: () => Promise<void>;
  getAllFolder: () => Promise<void>;
};

function BookmarkListInFolder({
  title,
  bookmarkData,
  bookmarksInFolder,
  setShowSelectedFolder,
  refreshBookmarkListInFolder,
  contentId,
  getAllRootBookmarks,
  getAllFolder,
}: Props) {
  return (
    <section className="insideFolder">
      <div className="insideFolder-header">
        <p className="insideFolder-folderTitle">{title}</p>
        <button
          className="insideFolder-close"
          onClick={() => {
            setShowSelectedFolder(false);
          }}
        >
          <AiOutlineClose />
        </button>
      </div>
      <section className="insideFolder-bookmarks">
        {bookmarksInFolder &&
          bookmarksInFolder.map((bookmark: Bookmark, idx: number) => (
            <BookmarkItemInFolder
              key={idx}
              bookmarkData={bookmarkData}
              bookmark={bookmark}
              refreshBookmarkListInFolder={refreshBookmarkListInFolder}
              contentId={contentId}
              getAllRootBookmarks={getAllRootBookmarks}
              getAllFolder={getAllFolder}
            />
          ))}
      </section>
    </section>
  );
}

export default BookmarkListInFolder;
