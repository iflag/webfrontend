import React, { useEffect, useState } from "react";
import "components/feature/main-page/bookmark/bookmark.scss";
import {
  AiOutlineSearch,
  AiFillPlusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import FolderList from "components/feature/main-page/bookmark/folder-list";
import BookmarkData from "utils/bookmark-data";
import { DarkModalSection } from "components/feature/header/auth/auth";
import { useUserState } from "contexts/user-context";

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

export type BookmarkInfo = {
  title: string;
  description: string;
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
  const userState = useUserState();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");

  const [showAddBookmarkForm, setShowAddBookmarkForm] = useState(false);

  const [rootBookmarks, setRootBookmarks] = useState<Bookmark[]>([]);

  const getAllRootBookmarks = async () => {
    try {
      const response = await bookmarkData.getAllBookmarks();
      const newRootBookmarks = await response.data[0].bookmarks;
      setRootBookmarks(newRootBookmarks);
    } catch (error) {
      setRootBookmarks([]);
    }
  };

  const [folderInfoList, setFolderInfoList] = useState<FolderInfo[]>([]);
  const [folderNameList, setFolderNameList] = useState<string[]>([""]);

  const getAllFolder = async () => {
    try {
      const response = await bookmarkData.getAllFolderInfo();
      setFolderInfoList(response.data);
      const newFolderNameList = response.data.map(
        (info: FolderInfo) => info.title
      );
      setFolderNameList(["", ...newFolderNameList]);
    } catch (error) {
      setFolderInfoList([]);
      setFolderNameList([]);
    }
  };

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllFolder();
  }, []);

  useEffect(() => {
    getAllRootBookmarks();
    getAllFolder();
  }, [userState.onLogin]);

  return (
    <div className="bookmark">
      <div className="bookmark-header">
        <p className="bookmark-header-title">Bookmark</p>
        <form
          className="bookmark-searchForm"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (searchInput === "") {
              getAllRootBookmarks();
              getAllFolder();
            } else {
              bookmarkData.searchBookmark(searchInput).then((response) => {
                if (response.status === 200) {
                  console.log(response.data[0].bookmarks);
                  if (response.data[0].bookmarks.length === 0) {
                    alert("원하는 북마크를 찾을 수 없습니다.");
                  } else {
                    setRootBookmarks(response.data[0].bookmarks);
                    setFolderInfoList([]);
                  }
                }
              });
            }
          }}
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
        </DarkModalSection>
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
