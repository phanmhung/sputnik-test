export interface User {
  id: string;
  gender: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  dob: string;
  registered: string;
}


export interface PaginationResponse {
  data: User[]
  totalCount: number
}

export interface Filters {
  gender: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  dob: string;
  registered: string;
}
