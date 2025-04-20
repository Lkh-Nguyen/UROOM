export const getToken = async () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  localStorage.removeItem("token");
};


export const getIndexMyAccountPage = async () => {
  return localStorage.getItem("IndexMyAccountPage") ?? 0;
};

export const setIndexMyAccountPage = (index) => {
  localStorage.setItem("IndexMyAccountPage", index);
};

export const clearIndexMyAccountPage = () => {
  localStorage.removeItem("IndexMyAccountPage");
};

export const getStatusBooking = async () => {
  return localStorage.getItem("StatusBooking") ?? 0;
};

export const setStatusBooking = (index) => {
  localStorage.setItem("StatusBooking", index);
};

export const clearStatusBooking = () => {
  localStorage.removeItem("StatusBooking");
};

