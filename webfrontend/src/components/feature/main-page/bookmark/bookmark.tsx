import React, { useEffect, useState } from "react";
import "components/feature/main-page/bookmark/bookmark.scss";
import {
  AiOutlineSearch,
  AiFillPlusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import FolderList from "components/feature/main-page/bookmark/folder-list";
import BookmarkData from "utils/bookmark-data";
import styled from "styled-components";

const AddBookmarkForm = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: transparent;
`;

type Props = {
  bookmarkData: BookmarkData;
};

export type Bookmark = {
  author: object;
  category?: object;
  description: string;
  id: number;
  title: string;
  url: string;
};

export type Folder = {
  title: string;
  url: string;
  description: string;
  category_title?: string;
};

export type FolderInfo = {
  author: object;
  id: number;
  title: string;
};

const Bookmark = ({ bookmarkData }: Props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");

  const [showAddBookmarkForm, setShowAddBookmarkForm] = useState(false);

  const [rootBookmarks, setRootBookmarks] = useState<Bookmark[]>([]);

  const getAllRootBookmarks = async () => {
    const response = await bookmarkData.getAllBookmarks();
    const newRootBookmarks = await response.data[0].bookmarks;
    setRootBookmarks(newRootBookmarks);
  };

  const [folderInfoList, setFolderInfoList] = useState<FolderInfo[]>([]);
  const [folderNameList, setFolderNameList] = useState<string[]>([""]);

  const getAllFolder = async () => {
    const response = await bookmarkData.getAllFolderInfo();
    setFolderInfoList(response);
    const newFolderNameList = response.map((info: FolderInfo) => info.title);
    setFolderNameList(["", ...newFolderNameList]);
  };

  useEffect(() => {
    getAllFolder();
  }, []);

  return (
    <div className="bookmark">
      <div className="bookmark-header">
        <form
          className="bookmark-searchForm"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
          }}
        >
          <input className="bookmark-searchInput" placeholder="Search" />
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
        <AddBookmarkForm>
          <form
            className="bookmark-form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              bookmarkData
                .appendBookmark({
                  title,
                  url,
                  description,
                  category_title: categoryTitle,
                })
                .then((response) => {
                  if (response.status === 201) {
                    setShowAddBookmarkForm(false);
                    getAllRootBookmarks();
                    getAllFolder();
                    setTitle("");
                    setUrl("");
                    setDescription("");
                    setCategoryTitle("");
                  } else {
                    window.alert("북마크 추가 실패");
                  }
                });
            }}
          >
            <div className="bookmark-form-header">
              <p className="bookmark-form-title">Add Bookmark</p>
              <button
                className="bookmark-form-close"
                onClick={() => {
                  setShowAddBookmarkForm(false);
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
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
                required
              />
              <input
                className="bookmark-form-url"
                placeholder="Url"
                value={url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUrl(e.target.value);
                }}
                required
              />
              <input
                className="bookmark-form-description"
                placeholder="Description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(e.target.value);
                }}
                required
              />
              <select
                className="bookmark-form-categoryTitle"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setCategoryTitle(e.target.value);
                }}
              >
                {folderNameList.map((name: string, idx: number) => (
                  <option key={idx} onSelect={() => setCategoryTitle(name)}>
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
        </AddBookmarkForm>
      )}
      <FolderList
        bookmarkData={bookmarkData}
        getAllFolder={getAllFolder}
        folderInfoList={folderInfoList}
        rootBookmarks={rootBookmarks}
        getAllRootBookmarks={getAllRootBookmarks}
      />
    </div>
  );
};

export default Bookmark;
