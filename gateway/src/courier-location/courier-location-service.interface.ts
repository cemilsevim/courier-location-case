export interface GetCourierLastLocationApiResponse {
  _id: string;
  courierId: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetAllCouriersLastLocationApiResponse {
  _id: string;
  data: {
    _id: string;
    courierId: string;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
