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

export const apiCategorias = axios.create({
  baseURL: "https://erick5457.c44.integrator.host/api/categorias"
})

export const apiInstrumento = axios.create({
  baseURL: "https://erick5457.c44.integrator.host/api/instrumento"
})

export const apiMessageReceive = axios.create({
  baseURL: "https://erick5457.c44.integrator.host/api/mensagens/recebidas"
})


export const apiMessageSender = axios.create({
  baseURL: "https://erick5457.c44.integrator.host/api/mensagens/enviadas"
})


export const apiMessage = axios.create({
  baseURL: "https://erick5457.c44.integrator.host/api/message"
})
export const apiMessageAll = axios.create({
  baseURL: "https://erick5457.c44.integrator.host/api/mesage"
})


  // useEffect(() => {
  //   let interval
  //   if (isFocused) {
  //   LoadingChat()
  //   interval = setInterval(LoadingChat, 5000)
  // }
  // return () => clearInterval(interval);
  // }, [isFocused])
