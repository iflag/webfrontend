import axios, { AxiosResponse } from 'axios';
import {
  BookmarkInfo,
  CommonInfo,
} from 'components/feature/main-page/bookmark/bookmark-section';
import API_URL, { API_HOST } from 'utils/api';
import { getStorageItem, storageAccessKey } from 'utils/local-storage';

export interface IFolderData {
  getAllFolderInfo(): Promise<AxiosResponse<any>>;
  addFolder(title: string): Promise<void>;
  changeFolderName(id: number, title: string): Promise<void>;
  deleteFolder(id: number): Promise<void>;
}
export interface IBookmarkData {
  getAllBookmarks(): Promise<AxiosResponse<any>>;
  searchBookmarks(name: string): any;
  appendBookmark(bookmarkInfo: CommonInfo): Promise<void>;
  editBookmarkInfo(id: number, info: BookmarkInfo): Promise<void>;
  deleteBookmark(id: number): Promise<void>;
  getAllBookmarksInFolder(id: number): Promise<AxiosResponse<any>>;
}

class BookmarkData implements IFolderData, IBookmarkData {
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

    const token = getStorageItem(storageAccessKey, '');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.get(bookmarks, config);
    return response;
  }

  async appendBookmark({
    title,
    url,
    description,
    category_title,
  }: CommonInfo) {
    const { bookmarks } = this.bookmarkUrl;
    const data = {
      title,
      url,
      description,
      category_title,
    };
    const token = getStorageItem(storageAccessKey, '');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await this.base.post(bookmarks, data, config);
  }

  async getAllFolderInfo() {
    const { categories } = this.bookmarkUrl;
    const token = getStorageItem(storageAccessKey, '');
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
    const token = getStorageItem(storageAccessKey, '');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await this.base.post(categories, data, config);
  }

  async changeFolderName(id: number, title: string) {
    const { categories } = this.bookmarkUrl;
    const url = `${categories}${id}`;

    const data = {
      title,
    };
    const token = getStorageItem(storageAccessKey, '');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await this.base.put(url, data, config);
  }

  async editBookmarkInfo(id: number, info: BookmarkInfo) {
    const { bookmarks } = this.bookmarkUrl;
    const url = `${bookmarks}${id}`;

    const token = getStorageItem(storageAccessKey, '');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await this.base.put(url, info, config);
  }

  async deleteFolder(id: number) {
    const { categories } = this.bookmarkUrl;
    const url = `${categories}${id}`;

    const token = getStorageItem(storageAccessKey, '');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await this.base.delete(url, config);
  }

  async deleteBookmark(id: number) {
    const { bookmarks } = this.bookmarkUrl;
    const url = `${bookmarks}${id}`;

    const token = getStorageItem(storageAccessKey, '');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await this.base.delete(url, config);
  }

  async getAllBookmarksInFolder(id: number) {
    const { categories } = this.bookmarkUrl;
    const url = `${categories}${id}`;

    const token = getStorageItem(storageAccessKey, '');
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

    const token = getStorageItem(storageAccessKey, '');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.get(url, config);
    const result = await response.data;
    return result;
  }
}

export default BookmarkData;
