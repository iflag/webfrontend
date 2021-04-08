import axios, { AxiosResponse } from "axios";
import { Folder } from "components/feature/main-page/bookmark/bookmark";
import API_URL, { API_HOST } from "utils/api";
import { getStorageItem, storageKey } from "utils/local-storage";
import AuthService, { AuthServiceInterface } from "utils/auth-service";

class BookmarkData {
  private base;
  private bookmarkUrl;
  constructor() {
    this.base = axios.create({
      baseURL: API_HOST,
    });
    this.bookmarkUrl = API_URL.bookmarks;
  }

  async getAllBookmarks() {
    const { bookmarks } = this.bookmarkUrl;

    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.get(bookmarks, config);
    return response;
  }

  async appendBookmark(bookmarkInfo: Folder) {
    const { bookmarks } = this.bookmarkUrl;
    const data = {
      title: bookmarkInfo.title,
      url: bookmarkInfo.url,
      description: bookmarkInfo.description,
      category_title: bookmarkInfo.category_title,
    };
    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.post(bookmarks, data, config);
    return response;
  }

  async getAllFolderInfo() {
    const { categories } = this.bookmarkUrl;
    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.get(categories, config);
    return response.data;
  }

  async addFolder(title: string) {
    const { categories } = this.bookmarkUrl;
    const data = {
      title,
    };
    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.post(categories, data, config);
    return response.data;
  }

  async changeFolderName(id: number, title: string) {
    const { categories } = this.bookmarkUrl;
    const url = `${categories}${id}`;

    const data = {
      title,
    };
    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.put(url, data, config);
    return response;
  }

  async changeBookmarkName(id: number, title: string) {
    const { bookmarks } = this.bookmarkUrl;
    const url = `${bookmarks}${id}`;

    const data = {
      title,
    };
    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.put(url, data, config);
    return response;
  }

  async deleteFolderName(id: number) {
    const { categories } = this.bookmarkUrl;
    const url = `${categories}${id}`;

    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.delete(url, config);
    return response;
  }

  async deleteBookmarkName(id: number) {
    const { bookmarks } = this.bookmarkUrl;
    const url = `${bookmarks}${id}`;

    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.delete(url, config);
    return response;
  }

  async getAllBookmarksInFolder(id: number) {
    const { categories } = this.bookmarkUrl;
    const url = `${categories}${id}`;

    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.get(url, config);
    return response;
  }
}

export default BookmarkData;
