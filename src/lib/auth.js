
const TOKEN_KEY = "token";
export const UNAUTHORIZED_EVENT = "joker:unauthorized";

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
  }
};

export const isAuthenticated = () => Boolean(getToken());
