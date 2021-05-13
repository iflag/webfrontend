import AuthStore from "stores/auth-store";
import AuthService, { IAuthService } from "utils/auth-service";
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

  rootBookmarks: Bookmark[];
  bookmarksInFolder: Bookmark[];

  private bookmarkData: IBookmarkData;
  private authService: IAuthService;

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
    this.authService = new AuthService();

    this.bookmarkForm = new BookmarkForm(this);
  }

  setRootBookmarks(newRootBookmarks: Bookmark[]) {
    this.rootBookmarks = newRootBookmarks;
  }

  setBookmarksInFolder(newBookmarksInFolder: Bookmark[]) {
    this.bookmarksInFolder = newBookmarksInFolder;
  }

  async getAllRootBookmarks() {
    try {
      const response = await this.bookmarkData.getAllBookmarks();
      const newRootBookmarks = await response.data[0].bookmarks;
      this.setRootBookmarks(newRootBookmarks);
      this.authStore.refreshToken();
    } catch (error) {
      this.setRootBookmarks([]);
      if (error.response.status === 403) {
        this.authService.logout();
        return;
      }
      alert(error.request.response);
    }
  }

  async searchBookmarks(searchInput: string) {
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
    await this.bookmarkData.editBookmarkInfo(id, info);
  }

  async deleteBookmark(id: number) {
    await this.bookmarkData.deleteBookmark(id);
  }

  async refreshBookmarkListInFolder(id: number) {
    const response = await this.bookmarkData.getAllBookmarksInFolder(id);
    const result = await response.data;
    this.setBookmarksInFolder(result);
  }
}

export default BookmarkStore;
