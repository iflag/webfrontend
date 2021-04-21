import AuthService, { IAuthService } from "utils/auth-service";
import {
  Bookmark,
  FolderInfo,
} from "components/feature/main-page/bookmark/bookmark";
import { action, makeObservable, observable } from "mobx";
import BookmarkData, { IBookmarkData } from "utils/bookmark-data";
import { RootStore } from "./root-store";

class BookmarkStore {
  rootStore: RootStore;

  rootBookmarks: Bookmark[];
  folderInfoList: FolderInfo[];
  folderNameList: string[];

  private bookmarkData: IBookmarkData;
  private authService: IAuthService;

  constructor(root: RootStore) {
    makeObservable(this, {
      rootBookmarks: observable,
      folderInfoList: observable,
      folderNameList: observable,
      setRootBookmarks: action,
      setFolderInfoList: action,
      setFolderNameList: action,
      getAllRootBookmarks: action,
      getAllFolders: action,
      searchBookmarks: action,
    });

    this.rootStore = root;
    this.rootBookmarks = [];
    this.folderInfoList = [];
    this.folderNameList = [];

    this.bookmarkData = new BookmarkData();
    this.authService = new AuthService();
  }

  setRootBookmarks(rootBookmarks: Bookmark[]) {
    this.rootBookmarks = rootBookmarks;
  }
  setFolderInfoList(folderInfoList: FolderInfo[]) {
    this.folderInfoList = folderInfoList;
  }
  setFolderNameList(folderNameList: string[]) {
    this.folderNameList = folderNameList;
  }

  async getAllRootBookmarks() {
    try {
      const response = await this.bookmarkData.getAllBookmarks();
      const newRootBookmarks = await response.data[0].bookmarks;
      this.setRootBookmarks(newRootBookmarks);
      this.authService.refreshToken();
    } catch (error) {
      this.setRootBookmarks([]);
      if (error.response.status === 403) {
        this.authService.logout();
      }
    }
  }

  async getAllFolders() {
    try {
      const response = await this.bookmarkData.getAllFolderInfo();
      this.setFolderInfoList(response.data);
      const newFolderNameList = response.data.map(
        (info: FolderInfo) => info.title
      );
      this.setFolderNameList(["", ...newFolderNameList]);
      this.authService.refreshToken();
    } catch (error) {
      this.setFolderInfoList([]);
      this.setFolderNameList([]);
      if (error.response.status === 403) {
        this.authService.logout();
      }
    }
  }

  async searchBookmarks(searchInput: string) {
    if (searchInput === "") {
      this.getAllRootBookmarks();
      this.getAllFolders();
      return;
    }

    this.bookmarkData.searchBookmarks(searchInput).then((response) => {
      if (response.status === 200) {
        if (response.data[0].bookmarks.length === 0) {
          alert("원하는 북마크를 찾을 수 없습니다.");
        } else {
          this.setRootBookmarks(response.data[0].bookmarks);
          this.setFolderInfoList([]);
        }
      }
    });
  }
}

export default BookmarkStore;
