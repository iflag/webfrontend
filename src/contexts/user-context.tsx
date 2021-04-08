import React, { createContext, useContext, useReducer, Dispatch } from "react";

// Context Instance

// state context
export type User = {
  onLogin: boolean;
};

const UserStateContext = createContext<User | undefined>(undefined);

// dispatch context
type Action = { type: "LOGIN" } | { type: "LOGOUT" };

type UserDispatch = Dispatch<Action>;

const UserDispatchContext = createContext<UserDispatch | undefined>(undefined);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  function reducer(state: User, action: Action): User {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          onLogin: true,
        };
      case "LOGOUT":
        return {
          ...state,
          onLogin: false,
        };
      default:
        throw new Error("Unhandled action");
    }
  }

  const initialState = {
    onLogin: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
}

// Consumer (useContext)
export function useUserState() {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("UserProvider not found");
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error("UserProvider not found");
  return dispatch;
}
