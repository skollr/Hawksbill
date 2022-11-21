import { createContext, useEffect } from "react";
import {
  getToken,
  getUserData,
  logoutAPI,
  removeToken,
  removeUser,
  setToken,
  setUser,
} from "../helpers/helpers";
import {
  APIResponseInterface,
  LoginContext,
  PropsInterface,
} from "../helpers/interfaces";
import { useUser } from "../hooks/useUser";

export const AuthContext: React.Context<LoginContext> =
  createContext<LoginContext>({
    auth: undefined,
    login: () => {},
    logout: () => {},
  });

export const AuthProvider: React.FC<PropsInterface> = ({
  children,
}): JSX.Element => {
  const [auth, setAuth] = useUser();
  const contextValue = {
    auth,
    login: async (response: APIResponseInterface) => {
      if (response.response && response.token !== undefined) {
        setToken(response.token);
        const userData = await getUserData();
        if (userData.data !== undefined) {
          setUser(userData.username);
          setAuth(userData.data);
        }
      } else {
        console.error(response.message);
      }
    },
    logout: async () => {
      const token = await getToken();
      if (auth !== null && auth !== undefined) {
        const response = await logoutAPI(token);
        if (response.response && response.redirect !== undefined) {
          removeToken();
          removeUser();
          window.location.replace(response.redirect);
        }
      }
    },
  };
  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      if (userData.data !== undefined) {
        setUser(userData.username);
        setAuth(userData.data);
      } else {
        setAuth(null);
      }
    })();
  }, []);
  return auth === undefined ? (
    <div />
  ) : (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
