import React, { useState } from "react";
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

const BookmarkItem = observer(({ bookmarkStore, content }: Props) => {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [url, setUrl] = useState(content.url);

  const [showEditSection, setShowEditSection] = useState(false);

  const showBookmarkEditForm = () => {
    return (
      <DarkModalSection>
        <form
          className="bookmarkItem-form"
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
          <div
            className="bookmarkItem-icon"
            onContextMenu={(
              e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
            ) => {
              e.preventDefault();
              setEditing(true);
            }}
          >
            {<Favicon content={content} />}
            {title}
          </div>
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
              onClick={() => {
                bookmarkStore.deleteBookmark(content.id, setEditing);
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
                  bookmarkStore.editBookmarkInfo(
                    content.id,
                    {
                      title,
                      description,
                      url,
                    },
                    setShowEditSection
                  );
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className="bookmarkItem-input"
            />
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
