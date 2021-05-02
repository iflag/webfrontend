import React, { useState } from "react";
import "components/feature/main-page/bookmark/folder-item.scss";
import {
  FolderInfo,
  Bookmark,
} from "components/feature/main-page/bookmark/bookmarks";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import BookmarkData from "utils/bookmark-data";
import BookmarkListInFolder from "components/feature/main-page/bookmark/bookmarkList-in-folder";
import { DarkModalSection } from "components/feature/header/auth/auth";
import Favicon from "./favicon";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";

type Props = {
  bookmarkData: BookmarkData;
  bookmarkStore: BookmarkStore;
  type: string;
  content: FolderInfo | Bookmark;
};

const FolderItem = observer(
  ({ bookmarkData, bookmarkStore, type, content }: Props) => {
    const [bookmarksInFolder, setBookmarksInFolder] = useState<Bookmark[]>([]);
    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState(content.title);
    const [description, setDescription] = useState(
      (content as Bookmark).description
    );
    const [url, setUrl] = useState((content as Bookmark).url);

    const [showSelectedFolder, setShowSelectedFolder] = useState(false);
    const [showEditSection, setShowEditSection] = useState(false);

    const refreshBookmarkListInFolder = (id: number) => {
      bookmarkData.getAllBookmarksInFolder(id).then(async (response) => {
        if (response.status === 200) {
          const newBookmarksInFolder = await response.data;
          setBookmarksInFolder(newBookmarksInFolder);
        }
      });
    };

    const showBookmarkEditForm = () => {
      return (
        <DarkModalSection>
          <form
            className="bookmark-form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              bookmarkStore.editBookmarkInfo(
                content.id,
                { title, description, url },
                setShowEditSection
              );
              setEditing(false);
            }}
          >
            <div className="folderItem-form-header">
              <p className="folderItem-form-title">Edit Bookmark</p>
              <button
                className="folderItem-form-close"
                onClick={() => {
                  setShowEditSection(false);
                }}
                type="button"
              >
                <AiOutlineClose />
              </button>
            </div>
            <section className="folderItem-form-input">
              <input
                className="folderItem-form-folderItemTitle"
                placeholder="Title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
                required
              />
              <input
                className="folderItem-form-url"
                placeholder="Url"
                value={url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUrl(e.target.value);
                }}
                required
              />
              <input
                className="folderItem-form-description"
                placeholder="Description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </section>
            <section className="folderItem-form-buttons">
              <button className="folderItem-form-submit" type="submit">
                Edit
              </button>
            </section>
          </form>
        </DarkModalSection>
      );
    };

    const showFolderItem = () => {
      return (
        <div
          className={`${
            type === "folder" ? "folderItem-folder" : "folderItem-bookmark"
          } ${editing ? "editing" : ""}`}
          onClick={() => {
            if (type === "folder") {
              if (!editing) {
                setShowSelectedFolder(true);
                refreshBookmarkListInFolder(content.id);
              }
            } else if (type === "bookmark") {
              if (!editing) {
                window.open(`${(content as Bookmark).url}`, "_blank");
              }
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
              {type === "bookmark" && <Favicon content={content} />}
              {title}
            </div>
          ) : (
            <div className="folderItem-setting">
              {type === "bookmark" && (
                <button
                  className="folderItem-edit"
                  onClick={() => {
                    setShowEditSection(true);
                  }}
                >
                  <IoMdSettings />
                </button>
              )}
              <button
                className="folderItem-delete"
                onClick={() => {
                  if (type === "folder") {
                    bookmarkData
                      .deleteFolderName(content.id)
                      .then((response) => {
                        if (response.status === 200) {
                          setEditing(false);
                          bookmarkStore.getAllFolders();
                        }
                      });
                  } else if (type === "bookmark") {
                    bookmarkData
                      .deleteBookmarkName(content.id)
                      .then((response) => {
                        if (response.status === 200) {
                          setEditing(false);
                          bookmarkStore.getAllRootBookmarks();
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
                  if (e.key === "Enter") {
                    setEditing(false);
                    if (type === "folder") {
                      bookmarkData
                        .changeFolderName(content.id, title)
                        .then((response) => {
                          if (response.status === 200) {
                            bookmarkStore.getAllFolders();
                          }
                        });
                    } else if (type === "bookmark") {
                      bookmarkData
                        .editBookmarkInfo(content.id, {
                          title,
                          description,
                          url,
                        })
                        .then((response) => {
                          if (response.status === 200) {
                            bookmarkStore.getAllRootBookmarks();
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
        {showEditSection && showBookmarkEditForm()}
      </div>
    );
  }
);

export default FolderItem;
