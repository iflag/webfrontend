import React, { lazy, Suspense, useState } from 'react';
import 'components/feature/main-page/bookmark/folder-item.scss';
import { FolderInfo } from 'components/feature/main-page/bookmark/bookmark-section';
import { AiOutlineClose } from 'react-icons/ai';
import BookmarkStore from 'stores/bookmark-store';
import { observer } from 'mobx-react';
import FolderStore from 'stores/folder-store';

type Props = {
  folderStore: FolderStore;
  bookmarkStore: BookmarkStore;
  content: FolderInfo;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const LazyBookmarkListInFolder = lazy(
  () => import('components/feature/main-page/bookmark/bookmarkList-in-folder')
);

const FolderItem = observer(
  ({ folderStore, bookmarkStore, content, editing, setEditing }: Props) => {
    const [title, setTitle] = useState(content.title);

    const [showSelectedFolder, setShowSelectedFolder] = useState(false);

    const handleMouseEnterLazyLoad = () =>
      import('components/feature/main-page/bookmark/bookmarkList-in-folder');

    const handleClickDeleteFolderButton = async () => {
      try {
        folderStore.deleteFolder(content.id);
      } catch (error) {
        alert(error.request.response);
      }
    };

    const handleSubmitFolderEditForm = (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      try {
        folderStore.editFolderName(content.id, title);
        setEditing(false);
      } catch (error) {
        alert(error.request.response);
      }
    };

    const showFolderItem = () => {
      return (
        <div className={`folderItem-main ${editing ? 'editing' : ''}`}>
          {!editing ? (
            <>
              <div className="folderItem-icon"></div>
              <p className="folderItem-title">{title}</p>
            </>
          ) : (
            <>
              <div className="folderItem-setting">
                <button
                  className="folderItem-delete"
                  onClick={handleClickDeleteFolderButton}
                >
                  <AiOutlineClose />
                </button>
              </div>
              <form
                className="folderItem-form"
                onSubmit={handleSubmitFolderEditForm}
              >
                <input
                  className="folderItem-input"
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

    return (
      <>
        <div
          className="folderItem-container"
          onClick={() => {
            if (!editing) {
              setShowSelectedFolder(true);
              bookmarkStore.refreshBookmarkListInFolder(content.id);
            }
          }}
        >
          <div className="folderItem" onMouseEnter={handleMouseEnterLazyLoad}>
            {showFolderItem()}
          </div>
        </div>
        {showSelectedFolder && (
          <Suspense fallback={null}>
            <LazyBookmarkListInFolder
              title={title}
              bookmarkStore={bookmarkStore}
              contentId={content.id}
              setShowSelectedFolder={setShowSelectedFolder}
            />
          </Suspense>
        )}
      </>
    );
  }
);

export default FolderItem;
