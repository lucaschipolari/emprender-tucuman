import { decodeJWT } from "../utilities/decodeJWT";

import api from "./axios";

export const postLoginFn = async (data) => {
  try {
    const res = await api.post('/Auth/login', data);
    
    const token = res.data.data;
    
    if (!token) {
      throw new Error(res.data.message || "Ocurrió un error");
    }
    
    const userData = decodeJWT(token);
    
    sessionStorage.setItem("token", token);

    return userData;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Ocurrió un error";
    throw new Error(message);
  }
};

export const postRegisterFn = async (data) => {
   try {
    await api.post('/Auth/register', {
      nombre: data.nombre,
      email: data.email,
      password: data.password,
    });
    
    const userData = await postLoginFn({
      email: data.email,
      password: data.password,
    });
    
    return userData;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Ocurrió un error";
    throw new Error(message);
  }
};