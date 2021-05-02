import React from "react";
import "components/feature/main-page/bookmark/bookmarkList-in-folder.scss";
import { Bookmark } from "components/feature/main-page/bookmark/bookmarks";
import { AiOutlineClose } from "react-icons/ai";
import BookmarkData from "utils/bookmark-data";
import BookmarkItemInFolder from "components/feature/main-page/bookmark/bookmarkItem-in-folder";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";

type Props = {
  title: string;
  bookmarkData: BookmarkData;
  bookmarkStore: BookmarkStore;
  bookmarksInFolder: Bookmark[];
  setShowSelectedFolder: React.Dispatch<React.SetStateAction<boolean>>;
  refreshBookmarkListInFolder: (id: number) => void;
  contentId: number;
};

const BookmarkListInFolder = observer(
  ({
    title,
    bookmarkData,
    bookmarkStore,
    bookmarksInFolder,
    setShowSelectedFolder,
    refreshBookmarkListInFolder,
    contentId,
  }: Props) => {
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
                bookmarkStore={bookmarkStore}
                bookmark={bookmark}
                refreshBookmarkListInFolder={refreshBookmarkListInFolder}
                contentId={contentId}
              />
            ))}
        </section>
      </section>
    );
  }
);

export default BookmarkListInFolder;
