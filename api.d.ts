type RemotePagination<T> = {
  data: T[];
  page: number;
  total: number;
  per_page: number;
  total_pages: number;
};

type RemoteTimeStamp = {
  updated_at: string;
  created_at: string;
};

type RemoteUser = {
  id: string;
  email: string;
  is_active: boolean;
} & RemoteTimeStamp;

type RemoteVehicle = {
  id: string;
  plate: string;
} & RemoteTimeStamp;

type RemoteVehicleType = {
  id: string;
  name: string;
  price_per_hour: number;
  initial_price: number;
} & RemoteTimeStamp;

type RemoteTicket = {
  id: string;
} & RemoteTimeStamp;

type RemoteCashRegister = {
  id: string;
  name: string;
  value: number;
  quantity: number;
} & RemoteTimeStamp;