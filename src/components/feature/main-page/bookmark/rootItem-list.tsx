import React, { useCallback, useState } from 'react';
import 'components/feature/main-page/bookmark/rootItem-list.scss';
import FolderItem from 'components/feature/main-page/bookmark/folder-item';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { IoMdSettings } from 'react-icons/io';
import {
  Bookmark,
  FolderInfo,
} from 'components/feature/main-page/bookmark/bookmark-section';
import BookmarkStore from 'stores/bookmark-store';
import { observer } from 'mobx-react';
import FolderStore from 'stores/folder-store';
import BookmarkItem from './bookmark-item';
import Modal from 'components/shared/modal';

type Props = {
  folderStore: FolderStore;
  bookmarkStore: BookmarkStore;
};

const RootItemList = observer(({ folderStore, bookmarkStore }: Props) => {
  const [showAddFolderForm, setShowAddFolderForm] = useState(false);
  const [title, setTitle] = useState('');

  const [editing, setEditing] = useState(false);

  const handleSubmitAddFolderForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      folderStore.addFolder(title);
      setShowAddFolderForm(false);
    } catch (error) {
      alert(error.request.response);
    }
    setTitle('');
  };

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div className="rootList">
      <button
        className="rootList-editButton"
        onClick={() => setEditing((prev) => !prev)}
      >
        <IoMdSettings />
      </button>

      <div className="rootList-content">
        <div className="rootList-button-container">
          <div className="rootList-container">
            <button
              className="rootList-addButton"
              onClick={() => setShowAddFolderForm(true)}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>

        <div className="rootList-folderSection">
          {folderStore.folderInfoList.map((folderInfo: FolderInfo) => {
            return (
              <FolderItem
                key={folderInfo.id}
                folderStore={folderStore}
                bookmarkStore={bookmarkStore}
                content={folderInfo}
                editing={editing}
                setEditing={setEditing}
              />
            );
          })}
        </div>

        <div className="rootList-bookmarkSection">
          {bookmarkStore.rootBookmarks.map((content: Bookmark) => (
            <BookmarkItem
              key={content.id}
              bookmarkStore={bookmarkStore}
              content={content}
              editing={editing}
              setEditing={setEditing}
            />
          ))}
        </div>
      </div>
      {showAddFolderForm && (
        <Modal onCloseModal={() => setShowAddFolderForm(false)}>
          <form
            className="rootList-form"
            onClick={stopPropagation}
            onSubmit={handleSubmitAddFolderForm}
          >
            <div className="rootList-form-header">
              <p className="rootList-form-title">Add Folder</p>
              <button
                className="rootList-form-close"
                onClick={() => {
                  setShowAddFolderForm(false);
                  setTitle('');
                }}
                type="button"
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="rootList-form-input">
              <input
                className="rootList-form-foldertitle"
                placeholder="Title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>
            <div className="rootList-form-buttons">
              <button className="rootList-form-submit" type="submit">
                Add
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
});

export default RootItemList;
