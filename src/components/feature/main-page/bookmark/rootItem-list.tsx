import React, { useEffect, useState } from "react";
import "components/feature/main-page/bookmark/rootItem-list.scss";
import FolderItem from "components/feature/main-page/bookmark/folder-item";
import BookmarkData from "utils/bookmark-data";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import {
  Bookmark,
  FolderInfo,
} from "components/feature/main-page/bookmark/bookmark-section";
import { DarkModalSection } from "components/feature/header/auth/auth";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";
import AuthStore from "stores/auth-store";
import FolderStore from "stores/folder-store";
import BookmarkItem from "./bookmark-item";

type Props = {
  bookmarkData: BookmarkData;
  folderStore: FolderStore;
  bookmarkStore: BookmarkStore;
  authStore: AuthStore;
};

const RootItemList = observer(
  ({ bookmarkData, folderStore, bookmarkStore, authStore }: Props) => {
    const [showAddFolderForm, setShowAddFolderForm] = useState(false);
    const [title, setTitle] = useState("");

    const addFolder = () => {
      bookmarkData.addFolder(title);
    };

    useEffect(() => {
      if (!authStore.onLogin) {
        bookmarkStore.setRootBookmarks([]);
        return;
      }
      bookmarkStore.getAllRootBookmarks();
    }, []);

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
                bookmarkData={bookmarkData}
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
            <form
              className="rootList-form"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                addFolder();
                bookmarkStore.getAllRootBookmarks();
                folderStore.getAllFolders();
                setShowAddFolderForm(false);
                setTitle("");
              }}
            >
              <div className="rootList-form-header">
                <p className="rootList-form-title">Add Folder</p>
                <button
                  className="rootList-form-close"
                  onClick={() => {
                    setShowAddFolderForm(false);
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
  }
);

export default RootItemList;
