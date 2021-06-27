import { action, makeObservable, observable, reaction } from "mobx";
import AuthService from "utils/auth-service";
import {
  getStorageItem,
  setStorageItem,
  storageAccessKey,
  storageAccessTokenExp,
  storageRefreshKey,
} from "utils/local-storage";
import LoginForm from "stores/login-form-store";
import RegisterForm from "stores/register-form-store";
import { RootStore } from "stores/root-store";

class AuthStore {
  private rootStore: RootStore;

  onLogin: boolean;
  requireRefresh: boolean;

  handleToken: () => void;

  private authService: AuthService;

  registerForm: RegisterForm;
  loginForm: LoginForm;

  constructor(root: RootStore) {
    makeObservable(this, {
      onLogin: observable,
      requireRefresh: observable,

      login: action,
      verificateEmail: action,
      checkVerificationCode: action,
      register: action,
      logout: action,
      checkLoginState: action,
      setRequireRefresh: action,
      refreshToken: action,
      checkAccessToken: action,
    });

    this.rootStore = root;
    this.onLogin = false;
    this.requireRefresh = false;

    this.authService = new AuthService();
    this.registerForm = new RegisterForm(this);
    this.loginForm = new LoginForm(this);

    this.handleToken = reaction(
      () => this.requireRefresh,
      (requireRefresh) => {
        if (requireRefresh) {
          this.authService
            .refreshToken()
            .then((result) => {
              console.log("token updated");
              setStorageItem(storageAccessKey, result.accessToken);
              setStorageItem(storageRefreshKey, result.refreshToken);
              setStorageItem(storageAccessTokenExp, result.accessTokenExp);
            })
            .then(() => {
              this.setRequireRefresh(false);
            });
        }
      }
    );
  }

  async login() {
    const result = await this.authService.login(
      this.loginForm.email,
      this.loginForm.password
    );
    setStorageItem(storageAccessKey, result.accessToken);
    setStorageItem(storageRefreshKey, result.refreshToken);
    setStorageItem(storageAccessTokenExp, result.accessTokenExp);
    this.onLogin = true;
  }

  async verificateEmail() {
    const response = await this.authService.verification(
      this.registerForm.email
    );
    if (response.status === 201) {
      this.registerForm.setStep("verification");
    }
  }

  async checkVerificationCode() {
    const response = await this.authService.verificationCode(
      this.registerForm.verificationCode
    );
    if (response.status === 200) {
      this.registerForm.setStep("password");
    }
  }

  async register() {
    const response = await this.authService.register(
      this.registerForm.email,
      this.registerForm.password
    );
    if (response.status === 201) {
      this.registerForm.setStep("success");
    }
  }

  async logout() {
    this.authService.logout();
    this.onLogin = false;
  }

  checkLoginState() {
    try {
      if (this.authService.isTokenExpired()) {
        this.logout();
      } else {
        this.onLogin = true;
      }
    } catch (e) {
      this.logout();
    }
  }

  setRequireRefresh(state: boolean) {
    this.requireRefresh = state;
  }

  refreshToken() {
    this.setRequireRefresh(true);
    // this.handleToken();
  }

  checkAccessToken() {
    try {
      if (this.authService.isTokenExpired()) this.refreshToken();
    } catch (e) {
      this.logout();
    }
  }
}

export default AuthStore;
