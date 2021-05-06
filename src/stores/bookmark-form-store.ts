import { action, makeObservable, observable } from "mobx";
import BookmarkStore from "./bookmark-store";

class BookmarkForm {
  private rootStore: BookmarkStore;

  title: string;
  url: string;
  description: string;
  categoryTitle: string;

  constructor(root: BookmarkStore) {
    makeObservable(this, {
      title: observable,
      url: observable,
      description: observable,
      categoryTitle: observable,

      setTitle: action,
      setUrl: action,
      setDescription: action,
      setCategoryTitle: action,
      checkUrl: action,
      resetInfo: action,
    });

    this.rootStore = root;

    this.title = "";
    this.url = "";
    this.description = "";
    this.categoryTitle = "";
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }
  setUrl(newUrl: string) {
    this.url = newUrl;
  }
  setDescription(newDescription: string) {
    this.description = newDescription;
  }
  setCategoryTitle(newCategotyTitle: string) {
    this.categoryTitle = newCategotyTitle;
  }
  checkUrl = (): string => {
    const front = this.url.slice(0, 4);
    if (front !== "http") {
      return "https://".concat(this.url);
    }
    return this.url;
  };
  resetInfo() {
    this.title = "";
    this.url = "";
    this.description = "";
    this.categoryTitle = "";
  }
}

export default BookmarkForm;
