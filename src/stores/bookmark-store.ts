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

class BookmarkStore {
  private rootStore: RootStore;

  rootBookmarks: Bookmark[];

  private bookmarkData: IBookmarkData;
  private authService: IAuthService;

  constructor(
    root: RootStore,
    private authStore: AuthStore,
    private folderStore: FolderStore
  ) {
    makeObservable(this, {
      rootBookmarks: observable,

      setRootBookmarks: action,
      getAllRootBookmarks: action,
      searchBookmarks: action,
      editBookmarkInfo: action,
      deleteBookmark: action,
    });

    this.rootStore = root;
    this.rootBookmarks = [];

    this.bookmarkData = new BookmarkData();
    this.authService = new AuthService();
  }

  setRootBookmarks(rootBookmarks: Bookmark[]) {
    this.rootBookmarks = rootBookmarks;
  }

  async getAllRootBookmarks() {
    try {
      const response = await this.bookmarkData.getAllBookmarks();
      const newRootBookmarks = await response.data[0].bookmarks;
      this.setRootBookmarks(newRootBookmarks);
      this.authStore.refreshToken();
    } catch (error) {
      console.log(error);
      this.setRootBookmarks([]);
      if (error.response.status === 403) {
        this.authService.logout();
      }
    }
  }

  async searchBookmarks(searchInput: string) {
    if (searchInput === "") {
      this.getAllRootBookmarks();
      this.folderStore.getAllFolders();
      return;
    }

    this.bookmarkData.searchBookmarks(searchInput).then((response) => {
      if (response.status === 200) {
        if (response.data[0].bookmarks.length === 0) {
          alert("원하는 북마크를 찾을 수 없습니다.");
        } else {
          this.setRootBookmarks(response.data[0].bookmarks);
          this.folderStore.setFolderInfoList([]);
        }
      }
    });
  }

  async editBookmarkInfo(
    id: number,
    info: BookmarkInfo,
    setShowEditSection: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.bookmarkData.editBookmarkInfo(id, info).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        setShowEditSection(false);
        this.getAllRootBookmarks();
        this.folderStore.getAllFolders();
      } else {
        window.alert("북마크 정보 변경 실패");
      }
    });
  }

  async deleteBookmark(
    id: number,
    setEditing: (value: React.SetStateAction<boolean>) => void
  ) {
    this.bookmarkData.deleteBookmark(id).then((response) => {
      if (response.status === 200) {
        setEditing(false);
        this.getAllRootBookmarks();
      }
    });
  }
}

export default BookmarkStore;
