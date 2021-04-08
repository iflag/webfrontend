import React, { useState } from "react";
import "components/feature/main-page/bookmark/bookmarkItem-in-folder.scss";
import BookmarkData from "utils/bookmark-data";
import { Bookmark } from "components/feature/main-page/bookmark/bookmark";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  bookmarkData: BookmarkData;
  bookmark: Bookmark;
  refreshBookmarkListInFolder: (id: number) => void;
  contentId: number;
};

function BookmarkItemInFolder({
  bookmarkData,
  bookmark,
  refreshBookmarkListInFolder,
  contentId,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(bookmark.title);
  return (
    <span className={`insideFolder-bookmark ${editing ? "editing" : ""}`}>
      {!editing ? (
        <p
          className="insideFolder-title"
          onDoubleClick={() => {
            setEditing(true);
          }}
        >
          {title}
        </p>
      ) : (
        <div className="insideFolder-edit">
          <button
            className="insideFolder-delete"
            onClick={() => {
              bookmarkData.deleteBookmarkName(bookmark.id).then((response) => {
                if (response.status === 200) {
                  setEditing(false);
                  refreshBookmarkListInFolder(contentId);
                }
              });
            }}
          >
            <AiOutlineClose />
          </button>
          <input
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" || e.key === "Escape") {
                setEditing(false);
                bookmarkData
                  .changeBookmarkName(bookmark.id, title)
                  .then((response) => {
                    if (response.status === 200) {
                      refreshBookmarkListInFolder(contentId);
                    }
                  });
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            className="insideFolder-input"
          />
        </div>
      )}
    </span>
  );
}

export default BookmarkItemInFolder;
