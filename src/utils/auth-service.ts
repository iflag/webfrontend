import axios, { AxiosResponse } from "axios";
import API_URL, { API_HOST } from "utils/api";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
  storageAccessKey,
  storageRefreshKey,
} from "utils/local-storage";

export interface IAuthService {
  logout(): void;
  refreshToken: () => Promise<AxiosResponse<any>>;
}

class AuthService implements IAuthService {
  private base;
  private userUrl;

  constructor() {
    this.base = axios.create({
      baseURL: API_HOST,
    });
    this.userUrl = API_URL.users;
  }

  async verification(email: string) {
    const { verification } = this.userUrl;
    const data = {
      email,
    };

    const response = await this.base.post(verification, data);
    return response;
  }

  async verificationCode(code: string) {
    const { verificationCode } = this.userUrl;
    const data = {
      code,
    };

    const response = await this.base.post(verificationCode, data);
    return response;
  }

  async register(email: string, password: string) {
    const { signup } = this.userUrl;
    const data = {
      email,
      password,
    };

    const response = await this.base.post(signup, data);
    return response;
  }

  async login(email: string, password: string) {
    const { signin } = this.userUrl;
    const data = {
      email,
      password,
    };

    const response = await this.base.post(signin, data);
    return response;
  }

  logout() {
    removeStorageItem(storageAccessKey);
    removeStorageItem(storageRefreshKey);
  }

  async refreshToken() {
    const { refresh } = this.userUrl;

    const accessToken = getStorageItem(storageAccessKey, "");
    const refreshToken = getStorageItem(storageRefreshKey, "");

    const data = {
      accessToken,
      refreshToken,
    };

    const response = await this.base.post(refresh, data);
    const result = await response.data;
    setStorageItem(storageAccessKey, result.accessToken);
    setStorageItem(storageRefreshKey, result.refreshToken);
    return response;
  }
}

export default AuthService;
