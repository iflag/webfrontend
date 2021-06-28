import React, { useMemo, useState } from "react";
import "components/feature/main-page/bookmark/bookmark-item.scss";
import { Bookmark } from "components/feature/main-page/bookmark/bookmark-section";
import { AiOutlineClose } from "react-icons/ai";
import { DarkModalSection } from "components/feature/header/auth/auth";
import Favicon from "./favicon";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";

type Props = {
  bookmarkStore: BookmarkStore;
  content: Bookmark;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
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

const BookmarkItem = observer(
  ({ bookmarkStore, content, editing, setEditing }: Props) => {
    const [title, setTitle] = useState(content.title);

    const faviconUrl = useMemo(() => cleanUrl(content.url), [content.url]);

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
          description: content.description,
          url: content.url,
        });
        setEditing(false);
      } catch (error) {
        alert(error.request.response);
      }
    };

    const handleClickDeleteBookmarkButton = async () => {
      try {
        await bookmarkStore.deleteBookmark(content.id);
        bookmarkStore.getAllRootBookmarks();
      } catch (error) {
        alert(error.request.response);
      }
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
              <div className="bookmarkItem-icon">
                {
                  <Favicon
                    url={content.url}
                    favicon={favicon}
                    setFavicon={setFavicon}
                  />
                }
              </div>
              <p className="bookmarkItem-title">{title}</p>
            </>
          ) : (
            <>
              <div className="bookmarkItem-setting">
                <button
                  className="bookmarkItem-delete"
                  onClick={handleClickDeleteBookmarkButton}
                >
                  <AiOutlineClose />
                </button>
              </div>
              <form onSubmit={handleSubmitBookmarkEditForm}>
                <input
                  className="bookmarkItem-input"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(e.target.value);
                  }}
                />
              </form>
            </>
          )}
        </div>
      );
    };

    return <div className="bookmarkItem">{showBookmarkItem()}</div>;
  }
);

export default BookmarkItem;
