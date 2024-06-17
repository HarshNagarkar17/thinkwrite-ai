import { AxiosResponse } from "axios";
import axiosInstance from "../../utils/axios";

const listApis: any = {};

listApis.get = async () => {
  const response: AxiosResponse = await axiosInstance.get("/l/fetch");
  return response.data;
};

listApis.post = async (title: string) => {
  const response: AxiosResponse = await axiosInstance.post("/l/add", { title });
  return response.data;
};

listApis.getContent = async (id: string) => {
  const response: AxiosResponse = await axiosInstance.get(
    `/l/getContent/${id}`
  );
  return response.data;
};
export default listApis;
