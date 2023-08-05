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

type RemoteDetailedVehicle = RemoteVehicle & { type: RemoteVehicleType };

type RemoteTicket = {
  id: string;
  invoice: RemoteInvoice | null;
  vehicle: RemoteDetailedVehicle;
} & RemoteTimeStamp;

type RemoteInvoice = {
  id: string;
  paid: number;
  change: number;
  charged: number;
  status: RemoteInvoiceStatus;
} & RemoteTimeStamp;

type RemoteInvoiceStatus = 'paid' | 'pending';

type RemoteCashRegister = {
  id: string;
  name: string;
  value: number;
  quantity: number;
} & RemoteTimeStamp;
