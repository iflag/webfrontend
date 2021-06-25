import React, { useEffect, useState } from "react";
import "components/feature/main-page/bookmark/bookmarkList-in-folder.scss";
import { Bookmark } from "components/feature/main-page/bookmark/bookmark-section";
import { AiOutlineClose } from "react-icons/ai";
import BookmarkItemInFolder from "components/feature/main-page/bookmark/bookmarkItem-in-folder";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";
import { IoMdSettings } from "react-icons/io";

type Props = {
  title: string;
  bookmarkStore: BookmarkStore;
  contentId: number;
  setShowSelectedFolder: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookmarkListInFolder = observer(
  ({ title, bookmarkStore, contentId, setShowSelectedFolder }: Props) => {
    const [editing, setEditing] = useState(false);

    useEffect(() => {
      return () => {
        bookmarkStore.setBookmarksInFolder([]);
      };
    }, []);

    return (
      <section className="insideFolder">
        <div className="insideFolder-header">
          <p className="insideFolder-folderTitle">{title}</p>
          <button
            className="insideFolder-close"
            onClick={(e) => {
              setShowSelectedFolder(false);
              e.stopPropagation();
            }}
          >
            <AiOutlineClose />
          </button>
        </div>
        <section className="insideFolder-bookmarks">
          <button
            className="insideFolder-editButton"
            onClick={() => setEditing((prev) => !prev)}
          >
            <IoMdSettings />
          </button>

          {bookmarkStore.bookmarksInFolder &&
            bookmarkStore.bookmarksInFolder.map((bookmark: Bookmark) => (
              <BookmarkItemInFolder
                key={bookmark.id}
                bookmarkStore={bookmarkStore}
                bookmark={bookmark}
                contentId={contentId}
                editing={editing}
                setEditing={setEditing}
              />
            ))}
        </section>
      </section>
    );
  }
);

export default BookmarkListInFolder;
