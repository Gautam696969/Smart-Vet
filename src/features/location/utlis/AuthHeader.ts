export const authHeader = () => {
  const token = localStorage.getItem("token"); // ya context/redux se lelo
  return token ? { Authorization: `Bearer ${token}` } : {};
};
