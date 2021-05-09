import React, { useMemo, useState } from "react";
import "components/feature/main-page/bookmark/bookmarkItem-in-folder.scss";
import { Bookmark } from "components/feature/main-page/bookmark/bookmark-section";
import { AiOutlineClose } from "react-icons/ai";
import { DarkModalSection } from "components/feature/header/auth/auth";
import { IoMdSettings } from "react-icons/io";
import Favicon from "./favicon";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";
import { cleanUrl } from "components/feature/main-page/bookmark/bookmark-item";

type Props = {
  bookmarkStore: BookmarkStore;
  bookmark: Bookmark;
  contentId: number;
};

const BookmarkItemInFolder = observer(
  ({ bookmarkStore, bookmark, contentId }: Props) => {
    const [editing, setEditing] = useState(false);
    const [showeditSection, setShowEditSection] = useState(false);
    const [title, setTitle] = useState(bookmark.title);
    const [description, setDescription] = useState(bookmark.description);
    const [url, setUrl] = useState(bookmark.url);

    const faviconUrl = useMemo(() => cleanUrl(url), [url]);

    const [favicon, setFavicon] = useState(
      `http://www.google.com/s2/favicons?domain=${faviconUrl}`
    );

    const handleSubmitBookmarkEditForm = (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      try {
        bookmarkStore.editBookmarkInfo(bookmark.id, {
          title,
          description,
          url,
        });
        setShowEditSection(false);
        setEditing(false);
      } catch (error) {
        alert(error.response.message);
      }
    };

    const handleClickDeleteBookmarkButton = async () => {
      try {
        await bookmarkStore.deleteBookmark(bookmark.id);
        bookmarkStore.refreshBookmarkListInFolder(contentId);
        setEditing(false);
      } catch (error) {
        alert(error.response.message);
      }
    };

    const showBookmarkEditForm = () => {
      return (
        <DarkModalSection>
          <form
            className="bookmark-form"
            onSubmit={handleSubmitBookmarkEditForm}
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
            {
              <Favicon
                content={bookmark}
                favicon={favicon}
                setFavicon={setFavicon}
              />
            }
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
              onClick={handleClickDeleteBookmarkButton}
            >
              <AiOutlineClose />
            </button>
            <form onSubmit={handleSubmitBookmarkEditForm}>
              <input
                className="insideFolder-input"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
              />
            </form>
          </div>
        )}
        {showeditSection && showBookmarkEditForm()}
      </div>
    );
  }
);

export default BookmarkItemInFolder;
