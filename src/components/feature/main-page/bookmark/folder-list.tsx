import React, { useEffect, useState } from "react";
import "components/feature/main-page/bookmark/folder-list.scss";
import FolderItem from "components/feature/main-page/bookmark/folder-item";
import BookmarkData from "utils/bookmark-data";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import {
  Bookmark,
  FolderInfo,
} from "components/feature/main-page/bookmark/bookmarks";
import { DarkModalSection } from "components/feature/header/auth/auth";
import BookmarkStore from "stores/bookmark-store";
import { observer } from "mobx-react";
import AuthStore from "stores/auth-store";

type Props = {
  bookmarkData: BookmarkData;
  bookmarkStore: BookmarkStore;
  authStore: AuthStore;
};

const FolderList = observer(
  ({ bookmarkData, bookmarkStore, authStore }: Props) => {
    const [showAddFolderForm, setShowAddFolderForm] = useState(false);
    const [title, setTitle] = useState("");

    const addFolder = () => {
      bookmarkData.addFolder(title);
    };

    useEffect(() => {
      if (authStore.onLogin === false) {
        bookmarkStore.setRootBookmarks([]);
        return;
      }
      bookmarkStore.getAllRootBookmarks();
    }, []);

    return (
      <div className="folderList">
        <div className="folderList-content">
          <button
            className="folderList-addButton"
            onClick={() => setShowAddFolderForm(true)}
          >
            <AiOutlinePlus />
          </button>
          {bookmarkStore.folderInfoList.map(
            (folderInfo: FolderInfo, idx: number) => {
              return (
                <FolderItem
                  key={idx}
                  bookmarkData={bookmarkData}
                  bookmarkStore={bookmarkStore}
                  type="folder"
                  content={folderInfo}
                />
              );
            }
          )}
          {bookmarkStore.rootBookmarks.map((content: Bookmark, idx: number) => (
            <FolderItem
              key={idx}
              bookmarkData={bookmarkData}
              bookmarkStore={bookmarkStore}
              type="bookmark"
              content={content}
            />
          ))}
        </div>
        {showAddFolderForm && (
          <DarkModalSection>
            <form
              className="folderList-form"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                addFolder();
                bookmarkStore.getAllRootBookmarks();
                bookmarkStore.getAllFolders();
                setShowAddFolderForm(false);
              }}
            >
              <div className="folderList-form-header">
                <p className="folderList-form-title">Add Folder</p>
                <button
                  className="folderList-form-close"
                  onClick={() => {
                    setShowAddFolderForm(false);
                  }}
                  type="button"
                >
                  <AiOutlineClose />
                </button>
              </div>
              <section className="folderList-form-input">
                <input
                  className="folderList-form-foldertitle"
                  placeholder="Title"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
              </section>
              <section className="folderList-form-buttons">
                <button className="folderList-form-submit" type="submit">
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

export default FolderList;
