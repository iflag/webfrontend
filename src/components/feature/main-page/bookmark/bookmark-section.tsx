import React, { useEffect, useState } from "react";
import "components/feature/main-page/bookmark/bookmark-section.scss";
import {
  AiOutlineSearch,
  AiFillPlusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import RootItemList from "components/feature/main-page/bookmark/rootItem-list";
import { DarkModalSection } from "components/feature/header/auth/auth";
import { useStoreContext } from "contexts/store-context";
import { observer } from "mobx-react";
import AuthStore from "stores/auth-store";

type Props = {
  authStore: AuthStore;
};

export type Bookmark = {
  author: object;
  category?: object;
  description: string;
  id: number;
  title: string;
  url: string;
};

export type BookmarkInfo = Pick<Bookmark, "title" | "description" | "url">;

export type CommonInfo = {
  title: string;
  url: string;
  description: string;
  category_title?: string;
};

export type FolderInfo = Pick<Bookmark, "author" | "id" | "title">;

const BookmarkSection = observer(({ authStore }: Props) => {
  const { bookmarkStore } = useStoreContext();
  const { folderStore } = useStoreContext();
  const { bookmarkForm } = bookmarkStore;

  const [showAddBookmarkForm, setShowAddBookmarkForm] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!authStore.onLogin) {
      folderStore.setFolderInfoList([]);
      folderStore.setFolderNameList([]);
      bookmarkStore.setRootBookmarks([]);
      return;
    }
    bookmarkStore.getAllRootBookmarks();
    folderStore.getAllFolders();
  }, [authStore.onLogin]);

  const handleSubmitSearchInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      bookmarkStore.searchBookmarks(searchInput);
    } catch (error) {
      alert(error.request.response);
    }
  };

  const handleSubmitAddBookmarkForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      bookmarkStore.addBookmark();
      setShowAddBookmarkForm(false);
    } catch (error) {
      alert(error.request.response);
    }
    bookmarkForm.resetInfo();
  };
  return (
    <div className="bookmark">
      <div className="bookmark-header">
        <p className="bookmark-header-title">Bookmark</p>
        <form
          className="bookmark-searchForm"
          onSubmit={handleSubmitSearchInput}
        >
          <input
            className="bookmark-searchInput"
            placeholder="Search"
            value={searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchInput(e.target.value);
            }}
          />
          <button className="bookmark-searchButton" type="submit">
            <AiOutlineSearch />
          </button>
        </form>
        <button
          className="bookmark-addButton"
          onClick={() => setShowAddBookmarkForm(true)}
        >
          <AiFillPlusCircle />
        </button>
      </div>
      {showAddBookmarkForm && (
        <DarkModalSection>
          <form
            className="bookmark-form"
            onSubmit={handleSubmitAddBookmarkForm}
          >
            <div className="bookmark-form-header">
              <p className="bookmark-form-title">Add Bookmark</p>
              <button
                className="bookmark-form-close"
                onClick={() => {
                  setShowAddBookmarkForm(false);
                  bookmarkForm.resetInfo();
                }}
                type="button"
              >
                <AiOutlineClose />
              </button>
            </div>
            <section className="bookmark-form-input">
              <input
                className="bookmark-form-bookmarkTitle"
                placeholder="Title"
                value={bookmarkForm.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  bookmarkForm.setTitle(e.target.value);
                }}
                required
              />
              <input
                className="bookmark-form-url"
                placeholder="Url"
                value={bookmarkForm.url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  bookmarkForm.setUrl(e.target.value);
                }}
                required
              />
              <input
                className="bookmark-form-description"
                placeholder="Description"
                value={bookmarkForm.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  bookmarkForm.setDescription(e.target.value);
                }}
                required
              />
              <select
                className="bookmark-form-categoryTitle"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  bookmarkForm.setCategoryTitle(e.target.value);
                }}
              >
                {folderStore.folderNameList.map((name: string, idx: number) => (
                  <option
                    key={idx}
                    onSelect={() => bookmarkForm.setCategoryTitle(name)}
                  >
                    {name}
                  </option>
                ))}
              </select>
            </section>
            <section className="bookmark-form-buttons">
              <button className="bookmark-form-submit" type="submit">
                Add
              </button>
            </section>
          </form>
        </DarkModalSection>
      )}
      <RootItemList folderStore={folderStore} bookmarkStore={bookmarkStore} />
    </div>
  );
});

export default BookmarkSection;
