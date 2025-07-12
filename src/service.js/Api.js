import axios from "axios"

export const apiLogin = axios.create({
  baseURL: "https://erick5457.c44.integrator.host/api/login",
})


export const apiRegister = axios.create({
  baseURL: "https://erick5457.c44.integrator.host/api/register",
})


export const apiUsers = axios.create({
  baseURL: "https://erick5457.c44.integrator.host/api/usuarios",
})


export const apiCategory = axios.create({
  baseURL: "https://erick5457.c44.integrator.host/api/category",
})