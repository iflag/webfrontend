import BookmarkStore from "stores/bookmark-store";
import AuthStore from "stores/auth-store";
import FolderStore from "stores/folder-store";
export class RootStore {
  authStore;
  folderStore;
  bookmarkStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.folderStore = new FolderStore(this, this.authStore);
    this.bookmarkStore = new BookmarkStore(
      this,
      this.authStore,
      this.folderStore
    );
  }
}
