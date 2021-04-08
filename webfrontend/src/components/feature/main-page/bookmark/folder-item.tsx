import React, { useState } from "react";
import "components/feature/main-page/bookmark/folder-item.scss";
import {
  FolderInfo,
  Bookmark,
} from "components/feature/main-page/bookmark/bookmark";
import { AiOutlineClose } from "react-icons/ai";
import BookmarkData from "utils/bookmark-data";
import styled from "styled-components";
import BookmarkListInFolder from "components/feature/main-page/bookmark/bookmarkList-in-folder";

const BookmarksInFolderSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: transparent;
`;

type Props = {
  bookmarkData: BookmarkData;
  type: string;
  content: FolderInfo | Bookmark;
  getAllRootBookmarks: () => Promise<void>;
  getAllFolder: () => Promise<void>;
};

const FolderItem = ({
  bookmarkData,
  type,
  content,
  getAllRootBookmarks,
  getAllFolder,
}: Props) => {
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
      <span
        className={`${
          type === "folder" ? "folderItem-folder" : "folderItem-bookmark"
        } ${editing ? "editing" : ""}`}
        onClick={() => {
          if (type === "folder") {
            setShowSelectedFolder(true);
            refreshBookmarkListInFolder(content.id);
          }
        }}
      >
        {!editing ? (
          <p
            className="folderItem-title"
            onDoubleClick={() => {
              setEditing(true);
            }}
          >
            {title}
          </p>
        ) : (
          <div className="folderItem-edit">
            <button
              className="folderItem-delete"
              onClick={() => {
                if (type === "folder") {
                  bookmarkData.deleteFolderName(content.id).then((response) => {
                    if (response.status === 200) {
                      setEditing(false);
                      getAllFolder();
                    }
                  });
                } else if (type === "bookmark") {
                  bookmarkData
                    .deleteBookmarkName(content.id)
                    .then((response) => {
                      if (response.status === 200) {
                        setEditing(false);
                        getAllRootBookmarks();
                      }
                    });
                }
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
                  if (type === "folder") {
                    bookmarkData
                      .changeFolderName(content.id, title)
                      .then((response) => {
                        if (response.status === 200) {
                          getAllFolder();
                        }
                      });
                  } else if (type === "bookmark") {
                    bookmarkData
                      .changeBookmarkName(content.id, title)
                      .then((response) => {
                        if (response.status === 200) {
                          getAllRootBookmarks();
                        }
                      });
                  }
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className="folderItem-input"
            />
          </div>
        )}
      </span>
    );
  };
  return (
    <div className="folderItem">
      {showFolderItem()}
      {showSelectedFolder && (
        <BookmarksInFolderSection>
          <BookmarkListInFolder
            bookmarkData={bookmarkData}
            bookmarksInFolder={bookmarksInFolder}
            setShowSelectedFolder={setShowSelectedFolder}
            refreshBookmarkListInFolder={refreshBookmarkListInFolder}
            contentId={content.id}
          />
        </BookmarksInFolderSection>
      )}
    </div>
  );
};

export default FolderItem;
