import React, { useState } from "react";
import "components/feature/header/auth/login.scss";
import AuthService from "utils/auth-service";
import {
  setStorageItem,
  storageAccessKey,
  storageRefreshKey,
} from "utils/local-storage";
import { SelectedForm } from "components/Layout/header";
import { useUserDispatch } from "contexts/user-context";
import styled from "styled-components";
import { observer } from "mobx-react";

const LoadingSpinner = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: solid 0.2rem #ebebeb;
  border-top: solid 0.2rem #8bb7ee;
  animation: spin 1s linear infinite;
`;

type Props = {
  authService: AuthService;
  setShowSelectedForm: React.Dispatch<React.SetStateAction<SelectedForm>>;
};

const Login = observer(({ authService, setShowSelectedForm }: Props) => {
  const userDispatch = useUserDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loaded, setLoaded] = useState(true);
  return (
    <form
      className="login-form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoaded(false);
        authService
          .login(email, password)
          .then((response) => {
            setLoaded(true);
            if (response.status === 200) {
              const result = response.data;
              setStorageItem(storageAccessKey, result.accessToken);
              setStorageItem(storageRefreshKey, result.refreshToken);
              userDispatch({ type: "LOGIN" });
              setShowSelectedForm("close");
            }
          })
          .catch((error) => {
            alert(error.request.response);
            setLoaded(true);
          });
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
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          className="login-password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          required
        />
      </section>
      <section className="login-buttons">
        <button
          className={`login-submit ${loaded ? "" : "loading"}`}
          type="submit"
        >
          {loaded ? "Login" : <LoadingSpinner />}
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
