export interface Clinic {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

export interface ClinicApiResponse {
  data: Clinic[];
  totalPages: number;
}
