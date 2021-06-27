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
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookmarkItemInFolder = observer(
  ({ bookmarkStore, bookmark, contentId, editing, setEditing }: Props) => {
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
        alert(error.request.response);
      }
    };

    const handleClickDeleteBookmarkButton = async () => {
      try {
        await bookmarkStore.deleteBookmark(bookmark.id);
        bookmarkStore.refreshBookmarkListInFolder(contentId);
      } catch (error) {
        alert(error.request.response);
      }
    };

    const showBookmarkEditForm = () => {
      return (
        <DarkModalSection>
          <form
            className="bookmark-form"
            onSubmit={handleSubmitBookmarkEditForm}
          >
            <div className="insideFolder-form-header">
              <p className="insideFolder-form-title">Edit Bookmark</p>
              <button
                className="insideFolder-form-close"
                onClick={() => {
                  setShowEditSection(false);
                }}
                type="button"
              >
                <AiOutlineClose />
              </button>
            </div>
            <section className="insideFolder-form-input">
              <input
                className="insideFolder-form-bookmarkTitle"
                placeholder="Title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
                required
              />
              <input
                className="insideFolder-form-url"
                placeholder="Url"
                value={url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUrl(e.target.value);
                }}
                required
              />
              <input
                className="insideFolder-form-description"
                placeholder="Description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </section>
            <section className="insideFolder-form-buttons">
              <button className="insideFolder-form-submit" type="submit">
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
          <>
            <div className="insideFolder-icon">
              {
                <Favicon
                  content={bookmark}
                  favicon={favicon}
                  setFavicon={setFavicon}
                />
              }
            </div>
            <p className="insideFolder-bookmark-title">{title}</p>
          </>
        ) : (
          <>
            <div className="insideFolder-setting">
              <button
                className="insideFolder-delete"
                onClick={handleClickDeleteBookmarkButton}
              >
                <AiOutlineClose />
              </button>
            </div>
            <form onSubmit={handleSubmitBookmarkEditForm}>
              <input
                className="insideFolder-input"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
              />
            </form>
          </>
        )}
        {showeditSection && showBookmarkEditForm()}
      </div>
    );
  }
);

export default BookmarkItemInFolder;
