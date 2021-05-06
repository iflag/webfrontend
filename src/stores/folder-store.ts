import AuthStore from "stores/auth-store";
import AuthService, { IAuthService } from "utils/auth-service";
import { FolderInfo } from "components/feature/main-page/bookmark/bookmark-section";
import { action, makeObservable, observable } from "mobx";
import BookmarkData, { IFolderData } from "utils/bookmark-data";
import { RootStore } from "stores/root-store";

class FolderStore {
  private rootStore: RootStore;

  folderInfoList: FolderInfo[];
  folderNameList: string[];

  private bookmarkData: IFolderData;
  private authService: IAuthService;

  constructor(root: RootStore, private authStore: AuthStore) {
    makeObservable(this, {
      folderInfoList: observable,
      folderNameList: observable,

      setFolderInfoList: action,
      setFolderNameList: action,
      getAllFolders: action,
      addFolder: action,
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

  async addFolder(title: string) {
    await this.bookmarkData.addFolder(title);
    this.getAllFolders();
  }

  async editFolderName(id: number, title: string) {
    await this.bookmarkData.changeFolderName(id, title);
    this.getAllFolders();
  }

  async deleteFolder(id: number) {
    await this.bookmarkData.deleteFolder(id);
    this.getAllFolders();
  }
}

export default FolderStore;
