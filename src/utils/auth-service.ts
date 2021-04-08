import axios, { AxiosResponse } from "axios";
import API_URL, { API_HOST } from "utils/api";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
  storageKey,
} from "utils/local-storage";

export interface AuthServiceInterface {
  refreshToken: () => Promise<AxiosResponse<any>>;
}

class AuthService implements AuthServiceInterface {
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
    removeStorageItem(storageKey);
  }

  async refreshToken() {
    const { refresh } = this.userUrl;

    const token = getStorageItem(storageKey, "");

    const data = {
      token,
    };

    const response = await this.base.post(refresh, data);
    const newToken = await response.data;
    setStorageItem(storageKey, newToken);
    return response;
  }
}

export default AuthService;
