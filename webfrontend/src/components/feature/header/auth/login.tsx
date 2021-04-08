import React, { useState } from "react";
import "components/feature/header/auth/login.scss";
import { AiOutlineClose } from "react-icons/ai";
import AuthService from "utils/auth-service";
import { storageKey, setStorageItem } from "utils/local-storage";
import { SelectedForm } from "components/Layout/header";
import { useUserDispatch } from "contexts/user-context";

type Props = {
  authService: AuthService;
  setShowSelectedForm: React.Dispatch<React.SetStateAction<SelectedForm>>;
};

const Login = ({ authService, setShowSelectedForm }: Props) => {
  const userDispatch = useUserDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      className="login-form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        authService.login(email, password).then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            setStorageItem(storageKey, token);
            userDispatch({ type: "LOGIN" });
            setShowSelectedForm("close");
          }
        });
      }}
    >
      <div className="login-header">
        <p className="login-title">Login</p>
        <button
          className="login-close"
          onClick={() => {
            setShowSelectedForm("close");
          }}
          type="button"
        >
          <AiOutlineClose />
        </button>
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
        <button className="login-submit" type="submit">
          Login
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
};

export default Login;
