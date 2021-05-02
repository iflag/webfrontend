import BookmarkStore from "./bookmark-store";
import AuthStore from "./auth-store";
export class RootStore {
  bookmarkStore;
  authStore;

  constructor() {
    this.bookmarkStore = new BookmarkStore(this);
    this.authStore = new AuthStore(this);
  }
}
