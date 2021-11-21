import axios from "axios";
import { apiConfigs } from "../config/apiConfigs";

export const apiGet = async (url) => {
  try {
    const { data } = await axios.get(apiConfigs.baseUrl + url);
    return data;
  } catch (error) {
    return error;
  }
};

export const apiPost = async (url, postData) => {
  try { 
    const result  = await axios.post(apiConfigs.baseUrl + url, postData);   
    return result;
  } catch (error) {
    return error;
  }
};

export const apiPut = async (url, postData) => {
  try { 
    const result  = await axios.put(apiConfigs.baseUrl + url, postData);   
    return result;
  } catch (error) {
    return error;
  }
};

export const apiDelete = async (url, postData) => {
  try {
    const data = await axios.delete(apiConfigs.baseUrl + url, {
      data: postData,
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const ApiFetcheExternal = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};
