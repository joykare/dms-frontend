export function getAuthToken() {
  return window.localStorage.getItem('token');
}

export function setAuthToken(token) {
  window.localStorage.setItem('token', token);
}

export function removeAuthToken() {
  window.localStorage.removeItem('token');
}

export function parseUserFromToken() {
  const token = getAuthToken();
  return token ? JSON.parse(window.atob(token.split('.')[1])) : null;
}
