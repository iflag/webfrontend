import axios, { AxiosResponse } from "axios";
import {
  BookmarkInfo,
  Folder,
} from "components/feature/main-page/bookmark/bookmark";
import API_URL, { API_HOST } from "utils/api";
import { getStorageItem, storageAccessKey } from "utils/local-storage";

export interface IBookmarkData {
  getAllBookmarks(): Promise<AxiosResponse<any>>;
  appendBookmark(bookmarkInfo: Folder): Promise<AxiosResponse<any>>;
  getAllFolderInfo(): Promise<AxiosResponse<any>>;
  addFolder(title: string): Promise<any>;
  getAllBookmarksInFolder(id: number): Promise<AxiosResponse<any>>;
  searchBookmarks(name: string): Promise<AxiosResponse<any>>;
}
class BookmarkData implements IBookmarkData {
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

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.post(bookmarks, data, config);
    return response;
  }

  async getAllFolderInfo() {
    const { categories } = this.bookmarkUrl;
    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.get(categories, config);
    return response;
  }

  async addFolder(title: string) {
    const { categories } = this.bookmarkUrl;
    const data = {
      title,
    };
    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.put(url, data, config);
    return response;
  }

  async editBookmarkInfo(id: number, info: BookmarkInfo) {
    const { bookmarks } = this.bookmarkUrl;
    const url = `${bookmarks}${id}`;

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.put(url, info, config);
    return response;
  }

  async deleteFolderName(id: number) {
    const { categories } = this.bookmarkUrl;
    const url = `${categories}${id}`;

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.delete(url, config);
    return response;
  }

  async deleteBookmarkName(id: number) {
    const { bookmarks } = this.bookmarkUrl;
    const url = `${bookmarks}${id}`;

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.delete(url, config);
    return response;
  }

  async getAllBookmarksInFolder(id: number) {
    const { categories } = this.bookmarkUrl;
    const url = `${categories}${id}`;

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.get(url, config);
    return response;
  }

  async searchBookmarks(name: string) {
    const { search } = this.bookmarkUrl;
    const url = `${search}?q=${name}`;

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.get(url, config);
    return response;
  }
}

export default BookmarkData;
