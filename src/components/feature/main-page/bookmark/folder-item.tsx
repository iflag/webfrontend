import React, { useState } from "react";
import "components/feature/main-page/bookmark/folder-item.scss";
import {
  FolderInfo,
  Bookmark,
} from "components/feature/main-page/bookmark/bookmark-section";
import { AiOutlineClose } from "react-icons/ai";
import BookmarkData from "utils/bookmark-data";
import BookmarkListInFolder from "components/feature/main-page/bookmark/bookmarkList-in-folder";
import { DarkModalSection } from "components/feature/header/auth/auth";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";
import FolderStore from "stores/folder-store";

type Props = {
  bookmarkData: BookmarkData;
  folderStore: FolderStore;
  bookmarkStore: BookmarkStore;
  content: FolderInfo | Bookmark;
};

const FolderItem = observer(
  ({ bookmarkData, folderStore, bookmarkStore, content }: Props) => {
    const [bookmarksInFolder, setBookmarksInFolder] = useState<Bookmark[]>([]);
    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState(content.title);

    const [showSelectedFolder, setShowSelectedFolder] = useState(false);

    const refreshBookmarkListInFolder = (id: number) => {
      bookmarkData.getAllBookmarksInFolder(id).then(async (response) => {
        if (response.status === 200) {
          const newBookmarksInFolder = await response.data;
          setBookmarksInFolder(newBookmarksInFolder);
        }
      });
    };

    const showFolderItem = () => {
      return (
        <div
          className={`folderItem-main ${editing ? "editing" : ""}`}
          onClick={() => {
            if (!editing) {
              setShowSelectedFolder(true);
              refreshBookmarkListInFolder(content.id);
            }
          }}
        >
          {!editing ? (
            <div
              className="folderItem-icon"
              onContextMenu={(
                e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
              ) => {
                e.preventDefault();
                setEditing(true);
              }}
            >
              {title}
            </div>
          ) : (
            <div className="folderItem-setting">
              <button
                className="folderItem-delete"
                onClick={() => {
                  folderStore.deleteFolder(content.id, setEditing);
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
                  if (e.key === "Enter") {
                    setEditing(false);
                    folderStore.editFolderName(content.id, title);
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                className="folderItem-input"
              />
            </div>
          )}
        </div>
      );
    };
    return (
      <div className="folderItem">
        {showFolderItem()}
        {showSelectedFolder && (
          <DarkModalSection>
            <BookmarkListInFolder
              title={title}
              bookmarkData={bookmarkData}
              bookmarkStore={bookmarkStore}
              bookmarksInFolder={bookmarksInFolder}
              setShowSelectedFolder={setShowSelectedFolder}
              refreshBookmarkListInFolder={refreshBookmarkListInFolder}
              contentId={content.id}
            />
          </DarkModalSection>
        )}
      </div>
    );
  }
);

export default FolderItem;
