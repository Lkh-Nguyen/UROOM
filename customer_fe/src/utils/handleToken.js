export const getToken = async () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

// Lưu user (object) vào localStorage
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Lấy user từ localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Xóa user khỏi localStorage
export const clearUser = () => {
  localStorage.removeItem("user");
};
