import { action, makeObservable, observable, reaction } from "mobx";
import AuthService from "utils/auth-service";
import {
  getStorageItem,
  setStorageItem,
  storageAccessKey,
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
              setStorageItem(storageAccessKey, result.accessToken);
              setStorageItem(storageRefreshKey, result.refreshToken);
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
    const token = getStorageItem(storageAccessKey, "");
    if (token.length > 0) {
      this.onLogin = true;
    } else {
      this.onLogin = false;
    }
  }

  setRequireRefresh(state: boolean) {
    this.requireRefresh = state;
  }

  refreshToken() {
    this.setRequireRefresh(true);
    // this.handleToken();
  }
}

export default AuthStore;
