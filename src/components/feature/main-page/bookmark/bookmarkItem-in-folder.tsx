import React, { memo, useMemo, useState } from 'react';
import 'components/feature/main-page/bookmark/bookmarkItem-in-folder.scss';
import { Bookmark } from 'components/feature/main-page/bookmark/bookmark-section';
import { AiOutlineClose } from 'react-icons/ai';
import { DarkModalSection } from 'components/feature/header/auth/auth';
import { IoMdSettings } from 'react-icons/io';
import Favicon from './favicon';
import BookmarkStore from 'stores/bookmark-store';
import { observer } from 'mobx-react';
import { cleanUrl } from 'components/feature/main-page/bookmark/bookmark-item';

type Props = {
  bookmarkStore: BookmarkStore;
  bookmark: Bookmark;
  contentId: number;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookmarkItemInFolder = observer(
  ({ bookmarkStore, bookmark, contentId, editing, setEditing }: Props) => {
    const [title, setTitle] = useState(bookmark.title);

    const faviconUrl = useMemo(() => cleanUrl(bookmark.url), [bookmark.url]);

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
          description: bookmark.description,
          url: bookmark.url,
        });
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

    return (
      <div
        className={`insideFolder-bookmark ${editing ? 'editing' : ''}`}
        onClick={() => {
          if (!editing) {
            window.open(`${bookmark.url}`, '_blank');
          }
        }}
      >
        {!editing ? (
          <>
            <div className="insideFolder-icon">
              {
                <Favicon
                  faviconUrl={faviconUrl}
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
      </div>
    );
  }
);

export default memo(BookmarkItemInFolder);
