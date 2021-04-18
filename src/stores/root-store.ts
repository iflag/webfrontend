import BookmarkStore from "./bookmark-store";

export class RootStore {
  bookmarkStore;

  constructor() {
    this.bookmarkStore = new BookmarkStore(this);
  }
}
