import React, { useState } from "react";
import "components/feature/main-page/bookmark/bookmarkItem-in-folder.scss";
import BookmarkData from "utils/bookmark-data";
import { Bookmark } from "components/feature/main-page/bookmark/bookmark-section";
import { AiOutlineClose } from "react-icons/ai";
import { DarkModalSection } from "components/feature/header/auth/auth";
import { IoMdSettings } from "react-icons/io";
import Favicon from "./favicon";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";

type Props = {
  bookmarkData: BookmarkData;
  bookmarkStore: BookmarkStore;
  bookmark: Bookmark;
  refreshBookmarkListInFolder: (id: number) => void;
  contentId: number;
};

const BookmarkItemInFolder = observer(
  ({
    bookmarkData,
    bookmarkStore,
    bookmark,
    refreshBookmarkListInFolder,
    contentId,
  }: Props) => {
    const [editing, setEditing] = useState(false);
    const [showeditSection, setShowEditSection] = useState(false);
    const [title, setTitle] = useState(bookmark.title);
    const [description, setDescription] = useState(bookmark.description);
    const [url, setUrl] = useState(bookmark.url);

    const showBookmarkEditForm = () => {
      return (
        <DarkModalSection>
          <form
            className="bookmark-form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              bookmarkStore.editBookmarkInfo(
                bookmark.id,
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

    return (
      <div
        className={`insideFolder-bookmark ${editing ? "editing" : ""}`}
        onClick={() => {
          if (!editing) {
            window.open(`${bookmark.url}`, "_blank");
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
            {<Favicon content={bookmark} />}
            {title}
          </div>
        ) : (
          <div className="insideFolder-setting">
            <button
              className="insideFolder-edit"
              onClick={() => {
                setShowEditSection(true);
              }}
            >
              <IoMdSettings />
            </button>
            <button
              className="insideFolder-delete"
              onClick={() => {
                bookmarkData.deleteBookmark(bookmark.id).then((response) => {
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
                    .editBookmarkInfo(bookmark.id, { title, description, url })
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
        {showeditSection && showBookmarkEditForm()}
      </div>
    );
  }
);

export default BookmarkItemInFolder;
