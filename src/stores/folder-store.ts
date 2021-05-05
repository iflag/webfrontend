import AuthStore from "stores/auth-store";
import AuthService, { IAuthService } from "utils/auth-service";
import { FolderInfo } from "components/feature/main-page/bookmark/bookmark-section";
import { action, makeObservable, observable } from "mobx";
import BookmarkData, { IBookmarkData } from "utils/bookmark-data";
import { RootStore } from "stores/root-store";

class FolderStore {
  private rootStore: RootStore;

  folderInfoList: FolderInfo[];
  folderNameList: string[];

  private bookmarkData: IBookmarkData;
  private authService: IAuthService;

  constructor(root: RootStore, private authStore: AuthStore) {
    makeObservable(this, {
      folderInfoList: observable,
      folderNameList: observable,

      setFolderInfoList: action,
      setFolderNameList: action,
      getAllFolders: action,
      editFolderName: action,
      deleteFolder: action,
    });

    this.rootStore = root;
    this.folderInfoList = [];
    this.folderNameList = [];

    this.bookmarkData = new BookmarkData();
    this.authService = new AuthService();
  }

  setFolderInfoList(folderInfoList: FolderInfo[]) {
    this.folderInfoList = folderInfoList;
  }
  setFolderNameList(folderNameList: string[]) {
    this.folderNameList = folderNameList;
  }

  async getAllFolders() {
    try {
      const response = await this.bookmarkData.getAllFolderInfo();
      this.setFolderInfoList(response.data);
      const newFolderNameList = response.data.map(
        (info: FolderInfo) => info.title
      );
      this.setFolderNameList(["", ...newFolderNameList]);
      this.authStore.refreshToken();
    } catch (error) {
      this.setFolderInfoList([]);
      this.setFolderNameList([]);
      if (error.response.status === 403) {
        this.authService.logout();
      }
    }
  }

  async editFolderName(id: number, title: string) {
    this.bookmarkData.changeFolderName(id, title).then((response) => {
      if (response.status === 200) {
        this.getAllFolders();
      }
    });
  }

  async deleteFolder(
    id: number,
    setEditing: (value: React.SetStateAction<boolean>) => void
  ) {
    this.bookmarkData.deleteFolder(id).then((response) => {
      if (response.status === 200) {
        setEditing(false);
        this.getAllFolders();
      }
    });
  }
}

export default FolderStore;
