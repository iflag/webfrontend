import React, { useEffect } from "react";
import "components/feature/header/auth/login.scss";
import { SelectedForm } from "components/Layout/header";
import styled from "styled-components";
import { observer } from "mobx-react";
import AuthStore from "stores/auth-store";

const LoadingSpinner = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: solid 0.2rem #ebebeb;
  border-top: solid 0.2rem #8bb7ee;
  animation: spin 1s linear infinite;
`;

type Props = {
  authStore: AuthStore;
  setShowSelectedForm: React.Dispatch<React.SetStateAction<SelectedForm>>;
};

const Login = observer(({ authStore, setShowSelectedForm }: Props) => {
  useEffect(() => {
    return () => authStore.loginForm.resetInfo();
  }, []);

  return (
    <form
      className="login-form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        authStore.loginForm.setLoaded(false);
        authStore.login(setShowSelectedForm);
      }}
    >
      <div className="login-header">
        <p className="login-title">Login</p>
      </div>
      <section className="login-input">
        <input
          type="email"
          className="login-email"
          placeholder="Email"
          value={authStore.loginForm.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            authStore.loginForm.setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          className="login-password"
          placeholder="Password"
          value={authStore.loginForm.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            authStore.loginForm.setPassword(e.target.value);
          }}
          required
        />
      </section>
      <section className="login-buttons">
        <button
          className={`login-submit ${
            authStore.loginForm.loaded ? "" : "loading"
          }`}
          type="submit"
        >
          {authStore.loginForm.loaded ? "Login" : <LoadingSpinner />}
        </button>
        <button
          className="login-otherOption"
          type="button"
          onClick={() => {
            setShowSelectedForm("register");
          }}
        >
          SignUp
        </button>
      </section>
    </form>
  );
});

export default Login;
