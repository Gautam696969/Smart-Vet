import axios from "axios";
export async function fetchClinics(page: number) {
  const token = localStorage.getItem("token");
  return axios.get(`/api/clinics?page=${page}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}

