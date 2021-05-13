import React, { useState } from "react";
import "components/feature/main-page/bookmark/rootItem-list.scss";
import FolderItem from "components/feature/main-page/bookmark/folder-item";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import {
  Bookmark,
  FolderInfo,
} from "components/feature/main-page/bookmark/bookmark-section";
import { DarkModalSection } from "components/feature/header/auth/auth";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";
import FolderStore from "stores/folder-store";
import BookmarkItem from "./bookmark-item";

type Props = {
  folderStore: FolderStore;
  bookmarkStore: BookmarkStore;
};

const RootItemList = observer(({ folderStore, bookmarkStore }: Props) => {
  const [showAddFolderForm, setShowAddFolderForm] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmitAddFolderForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      folderStore.addFolder(title);
      setShowAddFolderForm(false);
    } catch (error) {
      alert(error.request.response);
    }
    setTitle("");
  };

  return (
    <div className="rootList">
      <div className="rootList-content">
        <button
          className="rootList-addButton"
          onClick={() => setShowAddFolderForm(true)}
        >
          <AiOutlinePlus />
        </button>
        {folderStore.folderInfoList.map((folderInfo: FolderInfo) => {
          return (
            <FolderItem
              key={folderInfo.id}
              folderStore={folderStore}
              bookmarkStore={bookmarkStore}
              content={folderInfo}
            />
          );
        })}
        {bookmarkStore.rootBookmarks.map((content: Bookmark) => (
          <BookmarkItem
            key={content.id}
            bookmarkStore={bookmarkStore}
            content={content}
          />
        ))}
      </div>
      {showAddFolderForm && (
        <DarkModalSection>
          <form className="rootList-form" onSubmit={handleSubmitAddFolderForm}>
            <div className="rootList-form-header">
              <p className="rootList-form-title">Add Folder</p>
              <button
                className="rootList-form-close"
                onClick={() => {
                  setShowAddFolderForm(false);
                  setTitle("");
                }}
                type="button"
              >
                <AiOutlineClose />
              </button>
            </div>
            <section className="rootList-form-input">
              <input
                className="rootList-form-foldertitle"
                placeholder="Title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </section>
            <section className="rootList-form-buttons">
              <button className="rootList-form-submit" type="submit">
                Add
              </button>
            </section>
          </form>
        </DarkModalSection>
      )}
    </div>
  );
});

export default RootItemList;
