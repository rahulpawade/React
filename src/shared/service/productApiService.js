import { useQuery, useMutation } from "react-query";
import { apiGet, apiDelete, apiPost, apiPut } from "./apiActions";
import { apiConfigs } from "../config/apiConfigs";

export const useProductList = () =>
  useQuery(
    ["get_ProductList"],
    () => {
      return apiGet(apiConfigs.paths.GetProductList);
    },
    { refetchOnWindowFocus: false }
  );

export const GetProductById = (id) =>
  useQuery(
    ["get_ProductById", id],
    () => {
      return apiGet(apiConfigs.paths.GetProductById(id));
    },
    { refetchOnWindowFocus: false }
  );

export const UseSaveProduct = () =>
  useMutation((SaveData) => {
    return apiPost(apiConfigs.paths.SaveProduct, SaveData.postData);
  });

export const UseUpdateProduct = () =>
  useMutation((UpdateData) => {
    return apiPut(apiConfigs.paths.UpdateProduct(UpdateData.id), UpdateData.postData);
  });

export const UseDeleteProduct = () =>
  useMutation((data) => {
    return apiDelete(apiConfigs.paths.DeleteProduct(data.id));
  });
