// Lưu token vào local storage
export const saveTokenToLocalStorage = (tokenName = 'token', token) => {
  localStorage.setItem(tokenName, token);
};

// Lấy token từ local storage
export const getTokenFromLocalStorage = (tokenName = 'token') => {
  return localStorage.getItem(tokenName);
};

// Xóa token khỏi local storage
export const removeTokenFromLocalStorage = (tokenName = 'token') => {
  localStorage.removeItem(tokenName);
};
