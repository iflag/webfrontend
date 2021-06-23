import React, { useMemo, useState } from "react";
import "components/feature/main-page/bookmark/bookmark-item.scss";
import { Bookmark } from "components/feature/main-page/bookmark/bookmark-section";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { DarkModalSection } from "components/feature/header/auth/auth";
import Favicon from "./favicon";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";

type Props = {
  bookmarkStore: BookmarkStore;
  content: Bookmark;
};

export const cleanUrl = (url: string) => {
  let cleanedUrl = url.includes("https")
    ? url.slice(8)
    : url.includes("http")
    ? url.slice(7)
    : "";
  if (cleanedUrl) {
    cleanedUrl = cleanedUrl.includes("/")
      ? cleanedUrl.split("/")[0]
      : cleanedUrl;
  }
  return cleanedUrl;
};

const BookmarkItem = observer(({ bookmarkStore, content }: Props) => {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [url, setUrl] = useState(content.url);

  const [showEditSection, setShowEditSection] = useState(false);

  const faviconUrl = useMemo(() => cleanUrl(url), [url]);

  const [favicon, setFavicon] = useState(
    `http://www.google.com/s2/favicons?domain=${faviconUrl}`
  );

  const handleSubmitBookmarkEditForm = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      bookmarkStore.editBookmarkInfo(content.id, {
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
      await bookmarkStore.deleteBookmark(content.id);
      bookmarkStore.getAllRootBookmarks();
      setEditing(false);
    } catch (error) {
      alert(error.request.response);
    }
  };

  const showBookmarkEditForm = () => {
    return (
      <DarkModalSection>
        <form
          className="bookmarkItem-form"
          onSubmit={handleSubmitBookmarkEditForm}
        >
          <div className="bookmarkItem-form-header">
            <p className="bookmarkItem-form-title">Edit Bookmark</p>
            <button
              className="bookmarkItem-form-close"
              onClick={() => {
                setShowEditSection(false);
              }}
              type="button"
            >
              <AiOutlineClose />
            </button>
          </div>
          <section className="bookmarkItem-form-input">
            <input
              className="bookmarkItem-form-title"
              placeholder="Title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
              required
            />
            <input
              className="bookmarkItem-form-url"
              placeholder="Url"
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUrl(e.target.value);
              }}
              required
            />
            <input
              className="bookmarkItem-form-description"
              placeholder="Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(e.target.value);
              }}
              required
            />
          </section>
          <section className="bookmarkItem-form-buttons">
            <button className="bookmarkItem-form-submit" type="submit">
              Edit
            </button>
          </section>
        </form>
      </DarkModalSection>
    );
  };

  const showBookmarkItem = () => {
    return (
      <div
        className={`bookmarkItem-main ${editing ? "editing" : ""}`}
        onClick={() => {
          if (!editing) {
            window.open(`${content.url}`, "_blank");
          }
        }}
      >
        {!editing ? (
          <>
            <div
              className="bookmarkItem-icon"
              onContextMenu={(
                e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
              ) => {
                e.preventDefault();
                setEditing(true);
              }}
            >
              {
                <Favicon
                  content={content}
                  favicon={favicon}
                  setFavicon={setFavicon}
                />
              }
            </div>
            <p className="bookmarkItem-title">{title}</p>
          </>
        ) : (
          <div className="bookmarkItem-setting">
            <button
              className="bookmarkItem-edit"
              onClick={() => {
                setShowEditSection(true);
              }}
            >
              <IoMdSettings />
            </button>
            <button
              className="bookmarkItem-delete"
              onClick={handleClickDeleteBookmarkButton}
            >
              <AiOutlineClose />
            </button>
            <form onSubmit={handleSubmitBookmarkEditForm}>
              <input
                className="bookmarkItem-input"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
              />
            </form>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="bookmarkItem">
      {showBookmarkItem()}
      {showEditSection && showBookmarkEditForm()}
    </div>
  );
});

export default BookmarkItem;
