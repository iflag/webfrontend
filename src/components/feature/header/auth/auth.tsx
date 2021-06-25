import React from "react";
import "components/feature/header/auth/auth.scss";
import styled from "styled-components";
import Login from "./login";
import Register from "./register";
import { SelectedForm } from "components/Layout/header";
import AuthStore from "stores/auth-store";
import { observer } from "mobx-react";

export const DarkModalSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.6);
`;

type Props = {
  authStore: AuthStore;
  showSelectedForm: SelectedForm;
  setShowSelectedForm: React.Dispatch<React.SetStateAction<SelectedForm>>;
};

const Auth = observer(
  ({ authStore, showSelectedForm, setShowSelectedForm }: Props) => {
    return (
      <DarkModalSection>
        {showSelectedForm === "login" && (
          <Login
            authStore={authStore}
            setShowSelectedForm={setShowSelectedForm}
          />
        )}
        {showSelectedForm === "register" && (
          <Register
            authStore={authStore}
            setShowSelectedForm={setShowSelectedForm}
          />
        )}
      </DarkModalSection>
    );
  }
);

export default Auth;
