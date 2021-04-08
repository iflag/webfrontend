import React from "react";
import "components/feature/header/auth/auth.scss";
import styled from "styled-components";
import Login from "./login";
import Register from "./register";
import AuthService from "utils/auth-service";
import { SelectedForm } from "components/Layout/header";

const AuthForm = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: transparent;
`;

type Props = {
  authService: AuthService;
  showSelectedForm: SelectedForm;
  setShowSelectedForm: React.Dispatch<React.SetStateAction<SelectedForm>>;
};

const Auth = ({
  authService,
  showSelectedForm,
  setShowSelectedForm,
}: Props) => {
  return (
    <AuthForm>
      {showSelectedForm === "login" && (
        <Login
          authService={authService}
          setShowSelectedForm={setShowSelectedForm}
        />
      )}
      {showSelectedForm === "register" && (
        <Register
          authService={authService}
          setShowSelectedForm={setShowSelectedForm}
        />
      )}
    </AuthForm>
  );
};

export default Auth;
