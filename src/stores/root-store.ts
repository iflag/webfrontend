import BookmarkStore from "./bookmark-store";
import AuthStore from "./auth-store";
export class RootStore {
  authStore;
  bookmarkStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.bookmarkStore = new BookmarkStore(this, this.authStore);
  }
}
