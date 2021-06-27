import AuthStore from "stores/auth-store";
import {
  Bookmark,
  BookmarkInfo,
} from "components/feature/main-page/bookmark/bookmark-section";
import { action, makeObservable, observable } from "mobx";
import BookmarkData, { IBookmarkData } from "utils/bookmark-data";
import { RootStore } from "stores/root-store";
import FolderStore from "./folder-store";
import BookmarkForm from "./bookmark-form-store";

class BookmarkStore {
  private rootStore: RootStore;

  private bookmarkData: IBookmarkData;

  rootBookmarks: Bookmark[];
  bookmarksInFolder: Bookmark[];

  bookmarkForm: BookmarkForm;

  constructor(
    root: RootStore,
    private authStore: AuthStore,
    private folderStore: FolderStore
  ) {
    makeObservable(this, {
      rootBookmarks: observable,
      bookmarksInFolder: observable,

      setRootBookmarks: action,
      setBookmarksInFolder: action,
      getAllRootBookmarks: action,
      searchBookmarks: action,
      addBookmark: action,
      editBookmarkInfo: action,
      deleteBookmark: action,
      refreshBookmarkListInFolder: action,
    });

    this.rootStore = root;
    this.rootBookmarks = [];
    this.bookmarksInFolder = [];

    this.bookmarkData = new BookmarkData();

    this.bookmarkForm = new BookmarkForm(this);
  }

  setRootBookmarks(newRootBookmarks: Bookmark[]) {
    this.rootBookmarks = newRootBookmarks;
  }

  setBookmarksInFolder(newBookmarksInFolder: Bookmark[]) {
    this.bookmarksInFolder = newBookmarksInFolder;
  }

  async getAllRootBookmarks() {
    this.authStore.checkAccessToken();

    try {
      const response = await this.bookmarkData.getAllBookmarks();
      const newRootBookmarks = await response.data[0].bookmarks;
      this.setRootBookmarks(newRootBookmarks);
    } catch (error) {
      this.setRootBookmarks([]);
      if (error.response.status === 403) {
        this.authStore.logout();
        return;
      }
      alert(error.request.response);
    }
  }

  async searchBookmarks(searchInput: string) {
    this.authStore.checkAccessToken();

    if (searchInput === "") {
      this.getAllRootBookmarks();
      this.folderStore.getAllFolders();
      return;
    }

    const result = await this.bookmarkData.searchBookmarks(searchInput);
    if (result[0].bookmarks.length === 0) {
      alert("원하는 북마크를 찾을 수 없습니다.");
    } else {
      this.setRootBookmarks(result[0].bookmarks);
      this.folderStore.setFolderInfoList([]);
    }
  }

  async addBookmark() {
    this.authStore.checkAccessToken();

    const { title, description, categoryTitle } = this.bookmarkForm;

    const fixedUrl = this.bookmarkForm.checkUrl();

    await this.bookmarkData.appendBookmark({
      title,
      url: fixedUrl,
      description,
      category_title: categoryTitle,
    });
    this.getAllRootBookmarks();
  }

  async editBookmarkInfo(id: number, info: BookmarkInfo) {
    this.authStore.checkAccessToken();

    await this.bookmarkData.editBookmarkInfo(id, info);
  }

  async deleteBookmark(id: number) {
    this.authStore.checkAccessToken();

    await this.bookmarkData.deleteBookmark(id);
  }

  async refreshBookmarkListInFolder(id: number) {
    this.authStore.checkAccessToken();

    const response = await this.bookmarkData.getAllBookmarksInFolder(id);
    const result = await response.data;
    this.setBookmarksInFolder(result);
  }
}

export default BookmarkStore;
