import axios from "axios";
import { API } from "./Project_variable"; 

const axios_setup = axios.create({
  baseURL: API,
  timeout: 2000,
  withCredentials:true,
});

export default axios_setup;
